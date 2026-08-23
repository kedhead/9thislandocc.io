import type { APIRoute } from 'astro';

/** The Events tab is now Calendar — keep old links and bookmarks working. */
export const GET: APIRoute = ({ url }) => Response.redirect(new URL('/calendar', url), 302);
