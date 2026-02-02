import { AuthorizationCode } from 'simple-oauth2';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });
  const client = new AuthorizationCode({
    client: {
      id: undefined                               ,
      secret: undefined                                   
    },
    auth: {
      tokenHost: "https://github.com",
      tokenPath: "/login/oauth/access_token",
      authorizePath: "/login/oauth/authorize"
    }
  });
  try {
    const accessToken = await client.getToken({
      code,
      redirect_uri: undefined                                  
    });
    const token = accessToken.token.access_token;
    const tokenData = JSON.stringify({ token, provider: "github" });
    const message = "authorization:github:success:" + tokenData;
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authenticating...</title>
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; padding: 40px 20px; }
    .success { color: green; font-weight: bold; }
    .error { color: red; }
    button { padding: 12px 24px; font-size: 16px; cursor: pointer; margin-top: 20px; }
    pre { background: #f5f5f5; padding: 10px; text-align: left; overflow: auto; font-size: 11px; max-height: 200px; }
  </style>
</head>
<body>
  <h2>GitHub Authentication Successful</h2>
  <p id="status">Sending credentials to CMS...</p>
  <button onclick="manualSend()">Click here if CMS doesn't update</button>
  
  <h4>Debug Info:</h4>
  <pre id="debug"></pre>

  <script>
    var message = '${message}';
    var debugEl = document.getElementById('debug');
    var statusEl = document.getElementById('status');
    var sendCount = 0;
    
    function log(text) {
      console.log('[CALLBACK] ' + text);
      debugEl.textContent += text + '\\n';
    }
    
    log('Token received (length: ${token.length})');
    log('Message format: authorization:github:success:{...}');
    
    function sendToOpener() {
      sendCount++;
      log('Send attempt #' + sendCount);
      
      if (!window.opener) {
        statusEl.textContent = 'ERROR: window.opener is null!';
        statusEl.className = 'error';
        log('ERROR: window.opener is null - popup may have been blocked or opened incorrectly');
        return false;
      }
      
      try {
        // Send to same origin
        window.opener.postMessage(message, window.location.origin);
        log('Sent to origin: ' + window.location.origin);
        
        // Also try wildcard
        window.opener.postMessage(message, '*');
        log('Sent to wildcard (*)');
        
        statusEl.textContent = 'Credentials sent! Check your main browser window.';
        statusEl.className = 'success';
        return true;
      } catch (err) {
        log('ERROR: ' + err.message);
        statusEl.textContent = 'Error: ' + err.message;
        statusEl.className = 'error';
        return false;
      }
    }
    
    function manualSend() {
      log('Manual send triggered by user');
      sendToOpener();
    }
    
    // Check opener immediately
    if (window.opener) {
      log('window.opener exists');
      log('Opener location: ' + (window.opener.location ? 'accessible' : 'restricted'));
    } else {
      log('WARNING: window.opener is null on page load!');
    }
    
    // Send immediately
    sendToOpener();
    
    // Retry a few times
    var retryCount = 0;
    var maxRetries = 6;
    var retryInterval = setInterval(function() {
      retryCount++;
      if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        log('Stopped retrying after ' + maxRetries + ' attempts');
        log('If CMS still shows login, click the button above');
        return;
      }
      sendToOpener();
    }, 500);
    
    // Don't auto-close - let user see debug info
    log('Window will NOT auto-close so you can see this debug info');
  </script>
</body>
</html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  } catch (error) {
    const err = error;
    console.error("Access Token Error", err.message);
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><title>Auth Error</title></head>
      <body>
        <h2>Authentication Failed</h2>
        <p>${err.message}</p>
        <p>Please close this window and try again.</p>
      </body>
      </html>
    `, {
      status: 500,
      headers: { "Content-Type": "text/html" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
