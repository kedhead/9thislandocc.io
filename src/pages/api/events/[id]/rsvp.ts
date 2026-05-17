import type { APIRoute } from 'astro';
import { getEvent, updateEvent } from '../../../../lib/events';

export const POST: APIRoute = async ({ params, request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const { name } = await request.json();
  if (!name?.trim()) return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

  const event = await getEvent(id);
  if (!event) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

  const rsvps = [...(event.rsvps ?? [])];
  if (!rsvps.includes(name.trim())) rsvps.push(name.trim());

  const updated = await updateEvent(id, { rsvps });
  return new Response(JSON.stringify({ rsvps: updated?.rsvps ?? rsvps }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const { name } = await request.json();
  if (!name?.trim()) return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

  const event = await getEvent(id);
  if (!event) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

  const rsvps = (event.rsvps ?? []).filter(r => r !== name.trim());
  const updated = await updateEvent(id, { rsvps });
  return new Response(JSON.stringify({ rsvps: updated?.rsvps ?? rsvps }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
