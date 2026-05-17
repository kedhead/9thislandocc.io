import type { APIRoute } from 'astro';
import { getEvents, createEvent } from '../../../lib/events';
import type { ClubEvent } from '../../../lib/events';

function publicView(event: ClubEvent) {
  const { notes: _n, signupUrl: _s, ...pub } = event;
  return pub;
}

export const GET: APIRoute = async ({ cookies }) => {
  const isAuth = cookies.has('members_auth');
  const events = await getEvents();
  const result = isAuth ? events : events.map(publicView);
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, type, date, startTime, endTime, location, description, notes, signupUrl } = body;
    if (!title?.trim() || !type || !date || !startTime || !location?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }
    const event = await createEvent({
      title: title.trim(),
      type,
      date,
      startTime,
      endTime: endTime || undefined,
      location: location.trim(),
      description: description?.trim() || undefined,
      notes: notes?.trim() || undefined,
      signupUrl: signupUrl?.trim() || undefined,
    });
    return new Response(JSON.stringify(event), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
