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

const calendar = google.calendar({ 
  version: 'v3', 
  auth: oauth2Client,
  params: {
    sendNotificationsFromOrganizer: true
  }
})

interface BookingRequest {
  name: string
  email: string
  date: string
  guestCount: string
  message?: string
}

export async function POST(req: Request) {
  try {
    const data: BookingRequest = await req.json()
    
    const eventDate = new Date(data.date)
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    })

    const event = {
      summary: `PENDING Ritual Oysters Service`,
      description: formatEventDescription(data),
      start: {
        dateTime: new Date(data.date).toISOString(),
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: new Date(new Date(data.date).getTime() + 4 * 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Chicago',
      },
      attendees: [
        { email: 'bookings@ritualoysters.com' },
        { email: data.email }
      ],
      creator: {
        email: 'bookings@ritualoysters.com',
        displayName: 'Ritual Oysters Bookings'
      },
      organizer: {
        email: 'bookings@ritualoysters.com',
        displayName: 'Ritual Oysters Bookings',
        self: true
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 }
        ],
      },
    }

    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all',
      conferenceDataVersion: 0,
    })

    if (!calendarResponse?.data?.id) {
      throw new Error('Failed to create calendar event')
    }

    return NextResponse.json({ 
      success: true, 
      eventId: calendarResponse.data.id 
    })
  } catch (error: any) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process booking' },
      { status: 500 }
    )
  }
}

function formatEventDescription(data: BookingRequest): string {
  return `
Booking Request Details:
-----------------------
Client: ${data.name}
Email: ${data.email}
Guest Count: ${data.guestCount}

Additional Information:
${data.message || 'None provided'}
  `.trim()
} 