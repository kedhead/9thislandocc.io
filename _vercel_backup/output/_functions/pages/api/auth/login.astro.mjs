export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { password } = body;
    const correctPassword = undefined                                 || "aloha2026";
    if (password === correctPassword) {
      cookies.set("members_auth", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        // 30 days
        httpOnly: true,
        // Not accessible via client-side JS
        secure: true,
        // Secure in production
        sameSite: "lax"
      });
      return new Response(JSON.stringify({ success: true }), {
        status: 200
      });
    }
    return new Response(JSON.stringify({ error: "Incorrect password" }), {
      status: 401
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
