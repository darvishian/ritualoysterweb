import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

// Create OAuth2 client
const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
})

// Set credentials
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
})

// Create calendar client
const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

export async function createCalendarEvent(bookingData: {
  name: string
  email: string
  date: Date
  guestCount: string
  message?: string
}) {
  try {
    const event = {
      summary: `Oyster Catering Event - ${bookingData.name}`,
      description: `
        Guest Count: ${bookingData.guestCount}
        Contact: ${bookingData.name} (${bookingData.email})
        Additional Details: ${bookingData.message || 'None provided'}
      `,
      start: {
        dateTime: bookingData.date.toISOString(),
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: new Date(bookingData.date.getTime() + 4 * 60 * 60 * 1000).toISOString(), // Default 4-hour event
        timeZone: 'America/Chicago',
      },
      attendees: [
        { email: 'alex@ritualoysters.com' },
        { email: bookingData.email }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours
          { method: 'popup', minutes: 60 } // 1 hour
        ],
      },
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all', // Sends email notifications to attendees
    })

    return response.data
  } catch (error) {
    console.error('Error creating calendar event:', error)
    throw error
  }
} 