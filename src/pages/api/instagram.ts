import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    const token = import.meta.env.INSTAGRAM_ACCESS_TOKEN;

    // Mock data for when token is missing (so the UI looks good immediately)
    const mockMedia = [
        { id: '1', media_type: 'IMAGE', media_url: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', permalink: '#', caption: 'Sunrise paddle session #9thIsland' },
        { id: '2', media_type: 'IMAGE', media_url: 'https://images.unsplash.com/photo-1517480447814-2ac268d0af7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', permalink: '#', caption: 'Race day ready! #Outrigger' },
        { id: '3', media_type: 'IMAGE', media_url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', permalink: '#', caption: 'Training hard #Ohana' },
        { id: '4', media_type: 'IMAGE', media_url: 'https://images.unsplash.com/photo-1545562083-c6834bb4c73c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', permalink: '#', caption: 'Beautiful desert lake views' },
        { id: '5', media_type: 'IMAGE', media_url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', permalink: '#', caption: 'Teamwork makes the dream work' },
        { id: '6', media_type: 'IMAGE', media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', permalink: '#', caption: 'Post-practice vibes' },
    ];

    if (!token) {
        return new Response(JSON.stringify({
            data: mockMedia,
            warning: "Using mock data. Please set INSTAGRAM_ACCESS_TOKEN in env vars."
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}&limit=12`
        );

        if (!response.ok) {
            throw new Error(`Instagram API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Filter out videos if needed, or handle them. Basic Display API returns media_type
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate' // Cache for 1 hour
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
