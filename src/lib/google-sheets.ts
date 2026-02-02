
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

export interface RaceEvent {
    month: string;
    day: string;
    time: string;
    activity: string;
    location: string;
    notes?: string;
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

/**
 * RACE FINDER: Scans all month tabs for rows containing "race" in Activity column
 */
export async function getRaceEvents(spreadsheetId: string): Promise<RaceEvent[]> {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const races: RaceEvent[] = [];
    const serviceAccountEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    // If no credentials, return mock race data
    if (!serviceAccountEmail) {
        return [
            { month: 'March', day: 'Sat 15', time: '6:00 AM', activity: 'Havasu Heat Race!', location: 'Lake Havasu', notes: 'Big race!' },
            { month: 'April', day: 'Sun 20', time: '7:00 AM', activity: 'Spring Sprint Race', location: 'Lake Mead', notes: '' },
            { month: 'May', day: 'Sat 10', time: '6:30 AM', activity: 'Memorial Day Race', location: 'San Diego', notes: 'Travel required' },
        ];
    }

    // Scan each month tab
    for (const month of months) {
        try {
            const rows = await getSheetData(spreadsheetId, `${month}!A1:F100`);

            if (rows && rows.length > 1) {
                // Skip header row (index 0)
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    // Check if Activity column (usually index 2) contains "race" (case-insensitive)
                    const activity = row[2] || '';
                    if (activity.toLowerCase().includes('race')) {
                        races.push({
                            month,
                            day: row[0] || '',
                            time: row[1] || '',
                            activity,
                            location: row[3] || '',
                            notes: row[4] || '',
                        });
                    }
                }
            }
        } catch (e) {
            // Tab might not exist, skip silently
            console.log(`Could not scan ${month} tab:`, (e as Error).message);
        }
    }

    return races;
}

// --- Mock Data Helpers ---

function getMockData(range: string) {
    // Simple heuristic to return different mock data based on requested range name
    const lowerRange = range.toLowerCase();

    // Check for "schedule" OR any month name
    if (lowerRange.includes('schedule') ||
        ['january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'].some(m => lowerRange.includes(m))) {
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

