import type { APIRoute } from 'astro';
import { IMUATRAK_JOIN } from '../../lib/imuatrak';

/**
 * The members area now lives in the ImuaTrak app — rosters, RSVPs, and
 * scheduling all happen there. Old /members bookmarks land in the app
 * (or its web join page) instead of a dead route.
 */
export const GET: APIRoute = () => Response.redirect(IMUATRAK_JOIN, 302);
