import type { APIRoute } from 'astro';
import { getEvent, updateEvent } from '../../../../lib/events';
import type { MemberNote } from '../../../../lib/events';

export const POST: APIRoute = async ({ params, request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const { name, note } = await request.json();
  if (!name?.trim() || !note?.trim()) {
    return new Response(JSON.stringify({ error: 'Name and note required' }), { status: 400 });
  }

  const event = await getEvent(id);
  if (!event) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

  const memberNotes: MemberNote[] = [...(event.memberNotes ?? [])];
  memberNotes.push({ name: name.trim(), note: note.trim(), timestamp: new Date().toISOString() });

  const updated = await updateEvent(id, { memberNotes });
  return new Response(JSON.stringify({ memberNotes: updated?.memberNotes ?? memberNotes }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const { name, timestamp } = await request.json();
  if (!name?.trim()) return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

  const event = await getEvent(id);
  if (!event) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

  // Remove specific note by name+timestamp, or all notes by name if no timestamp
  const memberNotes = (event.memberNotes ?? []).filter(n =>
    timestamp ? !(n.name === name.trim() && n.timestamp === timestamp) : n.name !== name.trim()
  );

  const updated = await updateEvent(id, { memberNotes });
  return new Response(JSON.stringify({ memberNotes: updated?.memberNotes ?? memberNotes }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
