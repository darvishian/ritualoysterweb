import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
})

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

// Get blocked dates from your calendar
export async function GET() {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
      q: '[BLOCKED]' // We'll use this tag to identify blocked dates
    })

    const blockedDates = response.data.items?.map(event => ({
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
    })) || []

    return NextResponse.json({ blockedDates })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blocked dates' }, { status: 500 })
  }
}

// Add new blocked dates
export async function POST(req: Request) {
  try {
    const { date } = await req.json()
    
    const event = {
      summary: '[BLOCKED] Date Unavailable',
      start: {
        date: new Date(date).toISOString().split('T')[0],
      },
      end: {
        date: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    }

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to block date' }, { status: 500 })
  }
} 