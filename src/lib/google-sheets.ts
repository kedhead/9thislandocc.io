
import { google } from 'googleapis';

// Interface for our Schedule Data
export interface ScheduleItem {
    day: string;
    time: string;
    activity: string;
    location: string;
    notes?: string;
}

export interface SignupItem {
    eventDate: string;
    eventName: string;
    positionsOpen: string;
    link: string;
}

/**
 * UTILITY: Google Sheets Connector
 * 
 * This utility handles the connection to Google Sheets API.
 * If credentials are missing (local dev or not set up), it returns mock data
 * so the site remains functional.
 */
export async function getSheetData(spreadsheetId: string, range: string) {
    const serviceAccountEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // 1. If credentials missing, return Mock Data
    if (!serviceAccountEmail || !privateKey) {
        console.warn("⚠️ Google Sheets Credentials missing. Returning mock data.");
        return getMockData(range);
    }

    try {
        // 2. Authenticate
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: serviceAccountEmail,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 3. Fetch
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        return response.data.values || [];

    } catch (error) {
        console.error("❌ Google Sheets API Error:", error);
        return getMockData(range); // Fallback to mock on error too
    }
}

// --- Mock Data Helpers ---

function getMockData(range: string) {
    // Simple heuristic to return different mock data based on requested range name
    if (range.toLowerCase().includes('schedule')) {
        return [
            ['Day', 'Time', 'Activity', 'Location', 'Notes'], // Header Row
            ['Monday', '5:30 PM', 'Men\'s Technical Practice', 'Lake Mead', 'Bring hydration'],
            ['Wednesday', '5:30 PM', 'Women\'s Technical Practice', 'Lake Mead', ''],
            ['Saturday', '7:00 AM', 'Mixed Long Distance', 'Lake Mead', 'Breakfast after!'],
            ['Sunday', '8:00 AM', 'Novice Clinic', 'Lake Las Vegas', 'Open to all levels'],
        ];
    }

    if (range.toLowerCase().includes('signup') || range.toLowerCase().includes('events')) {
        return [
            ['Date', 'Event Name', 'Positions', 'Link'], // Header Row
            ['Oct 14', 'Crystal Pier Race', '3 Open', '#'],
            ['Nov 2', 'Lake Havasu Classic', 'Full', '#'],
            ['Dec 10', 'Holiday Party', 'RSVP Needed', '#'],
        ];
    }

    // Default empty
    return [];
}
