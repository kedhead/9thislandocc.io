import type { APIRoute } from 'astro';
import { AuthorizationCode } from 'simple-oauth2';

export const GET: APIRoute = async ({ url }) => {
    const code = url.searchParams.get('code');
    const host = url.host;

    if (!code) {
        return new Response('Missing code', { status: 400 });
    }

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

    try {
        const accessToken = await client.getToken({
            code,
            redirect_uri: import.meta.env.OAUTH_REDIRECT_URI,
        });

        const token = accessToken.token.access_token;

        // Return the script that posts the message back to the CMS window
        const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            
            // Check origin for security in production
            // if (e.origin !== "https://yoursite.com") { return; }

            // Send the token to the CMS window
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}', 
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          
          // Trigger the send immediately as Decap CMS listens
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}', 
            '*' // Target origin - in production ideally set to your site url
          );
        })();
      </script>
    `;

        return new Response(script, {
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (error) {
        console.error('Access Token Error', (error as Error).message);
        return new Response('Authentication failed', { status: 500 });
    }
}
