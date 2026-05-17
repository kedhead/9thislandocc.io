export interface CrewSeat {
  position: string;
  member?: string;
}

export interface Crew {
  name: string;
  seats: CrewSeat[];
}

export interface MemberNote {
  name: string;
  note: string;
  timestamp: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  type: 'practice' | 'race' | 'social' | 'other';
  date: string;        // YYYY-MM-DD
  startTime: string;   // HH:MM (24h)
  endTime?: string;
  location: string;
  description?: string;
  notes?: string;      // members-only
  signupUrl?: string;  // members-only
  rsvps: string[];
  crews?: Crew[];
  memberNotes?: MemberNote[];
  createdAt: string;
}

const EVENTS_KEY = 'schedule:events';

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

export async function getEvents(): Promise<ClubEvent[]> {
  const redis = await getRedis();
  if (!redis) return [];
  try {
    const data = await redis.get<ClubEvent[]>(EVENTS_KEY);
    if (!data) return [];
    return [...data].sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export async function getEvent(id: string): Promise<ClubEvent | null> {
  const events = await getEvents();
  return events.find(e => e.id === id) ?? null;
}

export async function createEvent(
  fields: Omit<ClubEvent, 'id' | 'createdAt' | 'rsvps'>
): Promise<ClubEvent> {
  const redis = await getRedis();
  if (!redis) throw new Error('Redis not configured');

  const newEvent: ClubEvent = {
    ...fields,
    id: crypto.randomUUID(),
    rsvps: [],
    createdAt: new Date().toISOString(),
  };

  const events = await getEvents();
  events.push(newEvent);
  events.sort((a, b) => a.date.localeCompare(b.date));
  await redis.set(EVENTS_KEY, events);
  return newEvent;
}

export async function updateEvent(
  id: string,
  updates: Partial<Omit<ClubEvent, 'id' | 'createdAt'>>
): Promise<ClubEvent | null> {
  const redis = await getRedis();
  if (!redis) throw new Error('Redis not configured');

  const events = await getEvents();
  const idx = events.findIndex(e => e.id === id);
  if (idx === -1) return null;

  events[idx] = { ...events[idx], ...updates };
  events.sort((a, b) => a.date.localeCompare(b.date));
  await redis.set(EVENTS_KEY, events);
  return events.find(e => e.id === id) ?? null;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const redis = await getRedis();
  if (!redis) throw new Error('Redis not configured');

  const events = await getEvents();
  const filtered = events.filter(e => e.id !== id);
  if (filtered.length === events.length) return false;

  await redis.set(EVENTS_KEY, filtered);
  return true;
}
