import type { APIRoute } from 'astro';
import { AuthorizationCode } from 'simple-oauth2';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

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

    // Return a proper HTML page to avoid quirks mode and handle the message passing robustly
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
  <style>body{font-family:sans-serif;text-align:center;padding:20px;}</style>
</head>
<body>
  <p>Authentication successful!</p>
  <p>Sending credentials to CMS...</p>
  <p id="status">Connecting...</p>
  <button onclick="send()" style="padding:10px 20px;margin-top:20px;cursor:pointer;">Retry Login</button>
  <script>
    const msg = 'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}';
    const status = document.getElementById('status');

    function send() {
      if (!window.opener) {
        status.innerText = "Error: No main window found (window.opener is null). Please close this and try again. Ensure popups are allowed.";
        return;
      }
      try {
        window.opener.postMessage(msg, '*');
        status.innerText = "Message sent. Closing...";
        console.info("Sent message to opener");
      } catch (e) {
        status.innerText = "Error sending message: " + e.message;
      }
    }

    // Retrying every 500ms ensures the opener receives the message even if busy/loading
    const interval = setInterval(send, 500);

    // Initial send
    send();

    // Close after 2.5 seconds giving enough time for the message to be processed
    setTimeout(() => {
      clearInterval(interval);
      window.close();
    }, 2500);
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Access Token Error', (error as Error).message);
    return new Response('Authentication failed: ' + (error as Error).message, { status: 500 });
  }
};
