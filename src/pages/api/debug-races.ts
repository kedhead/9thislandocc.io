import type { APIRoute } from 'astro';
import { getRaceEvents } from '../../lib/google-sheets';

// Temporary diagnostic endpoint — remove after debugging
export const GET: APIRoute = async () => {
  const hasGoogle = !!import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const hasAnthropic = !!import.meta.env.ANTHROPIC_API_KEY;
  const hasKV = !!import.meta.env.KV_REST_API_URL;

  const SHEET_ID = '16RYQ7ssTJJ3K7sBMtfhHnftrDr8NU_ilUc1ES3vHOW8';
  let races: unknown[] = [];
  let error: string | null = null;

  if (hasGoogle) {
    try {
      races = await getRaceEvents(SHEET_ID);
    } catch (e) {
      error = (e as Error).message;
    }
  }

  return new Response(JSON.stringify({ hasGoogle, hasAnthropic, hasKV, races, error }, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
