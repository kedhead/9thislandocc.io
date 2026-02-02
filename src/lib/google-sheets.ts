
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
 * RACE FINDER: Scans sheet headers (row 1) for columns containing "race"
 * Designed for column-based layouts where each event is a column header like:
 * "Havasu Heat Race!" with date on next cell "Sat, March 28 @ 6:00am"
 */
export async function getRaceEvents(spreadsheetId: string): Promise<RaceEvent[]> {
    const races: RaceEvent[] = [];
    const serviceAccountEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    // If no credentials, return mock race data
    if (!serviceAccountEmail) {
        return [
            { month: 'March', day: 'Sat 28', time: '6:00 AM', activity: 'Havasu Heat Race!', location: '', notes: '' },
            { month: 'April', day: 'Sun 20', time: '7:00 AM', activity: 'Spring Sprint Race', location: '', notes: '' },
            { month: 'May', day: 'Sat 10', time: '6:30 AM', activity: 'Memorial Day Race', location: '', notes: '' },
        ];
    }

    try {
        // Fetch the first two rows (headers) across many columns
        // Row 1 has the event name + date/time, Row 2 may have additional info
        const rows = await getSheetData(spreadsheetId, `March!A1:Z2`);

        if (rows && rows.length > 0) {
            const headerRow = rows[0];

            // Scan each column header for "race"
            for (let i = 0; i < headerRow.length; i++) {
                const header = headerRow[i] || '';

                if (header.toLowerCase().includes('race')) {
                    // Parse the header - format is usually like:
                    // "Havasu Heat Race!\nSat, March 28 @ 6:00am"
                    const lines = header.split('\n');
                    let eventName = header;
                    let dateInfo = '';
                    let time = '';
                    let month = '';
                    let day = '';

                    if (lines.length >= 2) {
                        eventName = lines[0].trim();
                        dateInfo = lines[1].trim();
                    } else {
                        // Maybe date/time is in the same line
                        dateInfo = header;
                    }

                    // Try to parse date info like "Sat, March 28 @ 6:00am"
                    const dateMatch = dateInfo.match(/(\w+),?\s*(\w+)\s+(\d+)/);
                    if (dateMatch) {
                        day = `${dateMatch[1]} ${dateMatch[3]}`;
                        month = dateMatch[2];
                    }

                    // Try to parse time like "@ 6:00am" or "@ 8:00am"
                    const timeMatch = dateInfo.match(/@\s*(\d+:\d+\s*[ap]m)/i);
                    if (timeMatch) {
                        time = timeMatch[1].toUpperCase();
                    }

                    races.push({
                        month: month || 'TBD',
                        day: day || 'TBD',
                        time: time || 'TBD',
                        activity: eventName,
                        location: '',
                        notes: '',
                    });
                }
            }
        }
    } catch (e) {
        console.log('Could not scan for races:', (e as Error).message);
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

