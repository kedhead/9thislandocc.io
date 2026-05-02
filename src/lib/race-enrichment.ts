import Anthropic from '@anthropic-ai/sdk';
import type { RaceEvent } from './google-sheets';

export interface EnrichedRace extends RaceEvent {
  description: string;
}

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function cacheKey(race: RaceEvent): string {
  return `race:v3:${race.activity.toLowerCase().replace(/\W+/g, '_')}:${race.month}_${race.day.replace(/\s+/g, '_')}`;
}

async function getRedis() {
  const url = import.meta.env.KV_REST_API_URL;
  const token = import.meta.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const { Redis } = await import('@upstash/redis');
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

async function searchAndDescribe(race: RaceEvent): Promise<string> {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) return '';

  const client = new Anthropic({ apiKey });
  const locationHint = race.location?.trim() ? ` at ${race.location}` : '';

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      tools: [{ type: 'web_search_20260209', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `Search for the outrigger canoe race "${race.activity}"${locationHint} in ${race.month}. Write 2 sentences max (under 200 characters total) for a public race calendar: where it takes place, who it's for, and what makes it worth attending. Be specific and factual. Return only the description, no preamble.`,
      }],
    });

    const text = response.content.find(b => b.type === 'text');
    const raw = text?.text?.trim() ?? '';
    return raw.length > 220 ? raw.slice(0, 217) + '…' : raw;
  } catch (err) {
    console.error('Race enrichment failed for', race.activity, err);
    return '';
  }
}

export async function getEnrichedRaces(races: RaceEvent[]): Promise<EnrichedRace[]> {
  const redis = await getRedis();

  return Promise.all(races.map(async (race): Promise<EnrichedRace> => {
    const key = cacheKey(race);

    // Each race is isolated — a Redis or API failure returns the race without a description
    try {
      if (redis) {
        const cached = await redis.get<string>(key);
        if (cached) return { ...race, description: cached };
      }

      const description = await searchAndDescribe(race);

      if (redis && description) {
        await redis.set(key, description, { ex: CACHE_TTL_SECONDS });
      }

      return { ...race, description };
    } catch {
      return { ...race, description: '' };
    }
  }));
}
