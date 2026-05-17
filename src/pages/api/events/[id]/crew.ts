import type { APIRoute } from 'astro';
import { getEvent, updateEvent } from '../../../../lib/events';
import type { Crew } from '../../../../lib/events';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  if (!cookies.has('members_auth')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  try {
    const { crews }: { crews: Crew[] } = await request.json();
    const event = await getEvent(id);
    if (!event) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

    const updated = await updateEvent(id, { crews });
    return new Response(JSON.stringify({ crews: updated?.crews ?? [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
