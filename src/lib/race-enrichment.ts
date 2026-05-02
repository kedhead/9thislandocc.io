import Anthropic from '@anthropic-ai/sdk';
import type { RaceEvent } from './google-sheets';

export interface EnrichedRace extends RaceEvent {
  description: string;
}

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function cacheKey(race: RaceEvent): string {
  return `race:${race.activity.toLowerCase().replace(/\W+/g, '_')}:${race.month}_${race.day.replace(/\s+/g, '_')}`;
}

async function getRedis() {
  const url = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;
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
      max_tokens: 300,
      tools: [{ type: 'web_search_20260209', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `Search for the outrigger canoe race "${race.activity}"${locationHint} held in ${race.month}. Write one sentence (under 130 characters) for a public race calendar: what the race is, where it takes place, and what makes it notable. Be specific and factual. Return only the sentence, no preamble.`,
      }],
    });

    const text = response.content.find(b => b.type === 'text');
    return text?.text?.trim() ?? '';
  } catch (err) {
    console.error('Race enrichment failed for', race.activity, err);
    return '';
  }
}

export async function getEnrichedRaces(races: RaceEvent[]): Promise<EnrichedRace[]> {
  const redis = await getRedis();

  return Promise.all(races.map(async (race): Promise<EnrichedRace> => {
    const key = cacheKey(race);

    if (redis) {
      const cached = await redis.get<string>(key);
      if (cached) return { ...race, description: cached };
    }

    const description = await searchAndDescribe(race);

    if (redis && description) {
      await redis.set(key, description, { ex: CACHE_TTL_SECONDS });
    }

    return { ...race, description };
  }));
}
