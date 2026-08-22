import type { APIRoute } from 'astro';
import { IMUATRAK_JOIN } from '../../lib/imuatrak';

// Catches /members/login, /members/schedule, and anything else once linked.
export const GET: APIRoute = () => Response.redirect(IMUATRAK_JOIN, 302);
