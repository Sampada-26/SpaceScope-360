import * as satellite from 'satellite.js';

// CelesTrak API Endpoints (Proxy might be needed in production to avoid CORS, but CelesTrak enables CORS usually)
const CELESTRAK_BASE = 'https://celestrak.org/NORAD/elements/gp.php';

export interface SatData {
    name: string;
    line1: string;
    line2: string;
    satrec: satellite.SatRec;
    groups: string[];
}

// Common groups we might want to track
// Common groups we might want to track
export const SAT_GROUPS = {
    ISS: 'stations',
    STARLINK: 'starlink',
    GPS: 'gps-ops',
    WEATHER: 'weather',
    SCIENCE: 'science', // Includes Hubble, etc.
    ENGINEERING: 'engineering',
    AMATEUR: 'amateur',
};

/**
 * Fetches TLE data from CelesTrak for a given group.
 * @param group The CelesTrak group query (e.g., 'stations', 'starlink')
 * @returns Array of parsed satellite objects
 */
export async function fetchTLEs(group: string = 'stations'): Promise<SatData[]> {
    try {
        const response = await fetch(`${CELESTRAK_BASE}?GROUP=${group}&FORMAT=tle`);
        if (!response.ok) {
            throw new Error(`Failed to fetch TLE data: ${response.statusText}`);
        }
        const text = await response.text();
        return parseTLEs(text, group);
    } catch (error) {
        console.error('Error fetching satellite data:', error);
        return [];
    }
}

/**
 * Parses raw TLE text into usable satellite objects with propagated positions.
 */
function parseTLEs(tleData: string, groupName: string): SatData[] {
    const lines = tleData.split('\n');
    const satellites: SatData[] = [];

    // TLE comes in 3-line sets (Name, Line 1, Line 2)
    for (let i = 0; i < lines.length; i += 3) {
        const name = lines[i]?.trim();
        const line1 = lines[i + 1]?.trim();
        const line2 = lines[i + 2]?.trim();

        if (name && line1 && line2) {
            try {
                const satrec = satellite.twoline2satrec(line1, line2);
                satellites.push({
                    name,
                    line1,
                    line2,
                    satrec,
                    groups: [groupName]
                });
            } catch (e) {
                console.warn(`Failed to parse satellite: ${name}`, e);
            }
        }
    }

    return satellites;
}
