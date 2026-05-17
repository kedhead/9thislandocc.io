import type { APIRoute } from 'astro';
import { getEvent, updateEvent, deleteEvent } from '../../../lib/events';
import type { ClubEvent } from '../../../lib/events';

function publicView(event: ClubEvent) {
  const { notes: _n, signupUrl: _s, ...pub } = event;
  return pub;
}

export const GET: APIRoute = async ({ params, cookies }) => {
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  const event = await getEvent(id);
  if (!event) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  const isAuth = cookies.has('members_auth');
  return new Response(JSON.stringify(isAuth ? event : publicView(event)), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  try {
    const body = await request.json();
    const updated = await updateEvent(id, body);
    if (!updated) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    return new Response(JSON.stringify(updated), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  try {
    const ok = await deleteEvent(id);
    if (!ok) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
