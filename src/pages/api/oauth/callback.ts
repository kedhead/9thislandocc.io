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

    // Return a proper HTML page to avoid quirks mode and handle the message passing
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authenticating...</title>
      </head>
      <body>
        <p>Authentication successful. You can close this window.</p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage %o", e);
              // Optional: security check for e.origin
              
              const message = 'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}';
              window.opener.postMessage(message, e.origin);
            }

            window.addEventListener("message", receiveMessage, false);
            
            // Send immediately to opener
            const message = 'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}';
            window.opener.postMessage(message, '*');

            // Close the window after a short delay
            setTimeout(() => {
              window.close();
            }, 1000);
          })();
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Access Token Error', (error as Error).message);
    return new Response('Authentication failed', { status: 500 });
  }
}
