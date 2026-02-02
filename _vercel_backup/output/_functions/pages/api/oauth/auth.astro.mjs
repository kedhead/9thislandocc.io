import { AuthorizationCode } from 'simple-oauth2';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ redirect }) => {
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
  const authorizationUri = client.authorizeURL({
    redirect_uri: undefined                                  ,
    // e.g., https://your-site.com/api/oauth/callback
    scope: "repo,user",
    // Scope required by Decap CMS
    state: Math.random().toString(36).substring(7)
  });
  return redirect(authorizationUri);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
