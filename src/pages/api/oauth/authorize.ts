import type { APIRoute } from 'astro';
import { AuthorizationCode } from 'simple-oauth2';

export const GET: APIRoute = async ({ redirect }) => {
    const client = new AuthorizationCode({
        client: {
            id: import.meta.env.OAUTH_CLIENT_ID,
            secret: import.meta.env.OAUTH_CLIENT_SECRET,
        },
        auth: {
            tokenHost: 'https://github.com',
            tokenPath: '/login/oauth/access_token',
            authorizePath: '/login/oauth/authorize',
        },
    });

    const authorizationUri = client.authorizeURL({
        redirect_uri: import.meta.env.OAUTH_REDIRECT_URI, // e.g., https://your-site.com/api/oauth/callback
        scope: 'repo,user', // Scope required by Decap CMS
        state: Math.random().toString(36).substring(7),
    });

    return redirect(authorizationUri);
};
