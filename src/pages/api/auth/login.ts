
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const body = await request.json();
        const { password } = body;

        // Check against Environment Variable
        // If not set (dev), use a default for testing
        const correctPassword = import.meta.env.MEMBERS_PASSWORD || 'aloha2026';

        if (password === correctPassword) {
            // Set a cookie that expires in 30 days
            cookies.set('members_auth', 'true', {
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                httpOnly: true, // Not accessible via client-side JS
                secure: import.meta.env.PROD, // Secure in production
                sameSite: 'lax'
            });

            return new Response(JSON.stringify({ success: true }), {
                status: 200
            });
        }

        return new Response(JSON.stringify({ error: 'Incorrect password' }), {
            status: 401
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500
        });
    }
};
