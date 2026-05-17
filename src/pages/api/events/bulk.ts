import type { APIRoute } from 'astro';
import { createEvents } from '../../../lib/events';

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  try {
    const { events } = await request.json();
    if (!Array.isArray(events) || events.length === 0) {
      return new Response(JSON.stringify({ error: 'No events provided' }), { status: 400 });
    }
    if (events.length > 365) {
      return new Response(JSON.stringify({ error: 'Maximum 365 events per bulk create' }), { status: 400 });
    }
    for (const ev of events) {
      if (!ev.title?.trim() || !ev.type || !ev.date || !ev.startTime || !ev.location?.trim()) {
        return new Response(JSON.stringify({ error: 'Each event requires title, type, date, startTime, and location' }), { status: 400 });
      }
    }
    const created = await createEvents(events);
    return new Response(JSON.stringify({ created: created.length }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
