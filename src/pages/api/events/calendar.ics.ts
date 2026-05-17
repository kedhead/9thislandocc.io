import type { APIRoute } from 'astro';
import { getEvents } from '../../../lib/events';

function icalDate(date: string, time: string): string {
  // date: YYYY-MM-DD, time: HH:MM → YYYYMMDDTHHMMSS
  const [y, m, d] = date.split('-');
  const [h, min] = time.split(':');
  return `${y}${m}${d}T${h}${min}00`;
}

function addHour(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const next = (h + 1) % 24;
  return `${String(next).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function fold(line: string): string {
  // RFC 5545 requires lines to be ≤75 octets; fold longer ones
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let i = 0;
  chunks.push(line.slice(0, 75));
  i = 75;
  while (i < line.length) {
    chunks.push(' ' + line.slice(i, i + 74));
    i += 74;
  }
  return chunks.join('\r\n');
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export const GET: APIRoute = async ({ url }) => {
  const singleId = url.searchParams.get('id');
  let events = await getEvents();
  if (singleId) events = events.filter(e => e.id === singleId);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//9th Island OCC//Club Schedule//EN',
    'X-WR-CALNAME:9th Island OCC',
    'X-WR-TIMEZONE:America/Los_Angeles',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const ev of events) {
    const dtstart = icalDate(ev.date, ev.startTime);
    const endTime = ev.endTime || addHour(ev.startTime);
    const dtend = icalDate(ev.date, endTime);

    lines.push('BEGIN:VEVENT');
    lines.push(fold(`UID:${ev.id}@9thislandoutrigger.com`));
    lines.push(fold(`DTSTART;TZID=America/Los_Angeles:${dtstart}`));
    lines.push(fold(`DTEND;TZID=America/Los_Angeles:${dtend}`));
    lines.push(fold(`SUMMARY:${esc(ev.title)}`));
    if (ev.location) lines.push(fold(`LOCATION:${esc(ev.location)}`));
    if (ev.description) lines.push(fold(`DESCRIPTION:${esc(ev.description)}`));
    lines.push(fold(`CATEGORIES:${ev.type.toUpperCase()}`));
    lines.push(`CREATED:${new Date(ev.createdAt).toISOString().replace(/[-:.]/g, '').slice(0, 15)}Z`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  const filename = singleId ? 'event.ics' : '9thisland-occ-schedule.ics';
  return new Response(lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
};
