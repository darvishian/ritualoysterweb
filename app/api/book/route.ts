import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    
    console.log('Booking request received:', {
      name: data.name,
      email: data.email,
      date: data.date,
      guestCount: data.guestCount
    })

    // Format date for email
    const eventDate = new Date(data.date)
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    })

    // Create calendar event
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

    console.log('Attempting to create calendar event...')
    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all',
      conferenceDataVersion: 0,
    })

    if (!calendarResponse?.data?.id) {
      console.error('Calendar response missing event ID:', calendarResponse)
      throw new Error('Failed to create calendar event: No event ID returned')
    }

    console.log('Calendar event created successfully:', calendarResponse.data.id)

    // Send confirmation email to client
    console.log('Sending confirmation email to client...')
    const clientEmailResponse = await resend.emails.send({
      from: 'Ritual Oysters <bookings@ritualoysters.com>',
      to: data.email,
      subject: 'Booking Request Received - Ritual Oysters',
      html: `
        <h1>Thank You for Your Booking Request</h1>
        <p>Dear ${data.name},</p>
        <p>We have received your booking request for ${formattedDate}. Our team will review your request and get back to you within 24 hours to confirm the details.</p>
        <h2>Booking Details:</h2>
        <ul>
          <li>Date: ${formattedDate}</li>
          <li>Guest Count: ${data.guestCount}</li>
          ${data.message ? `<li>Additional Information: ${data.message}</li>` : ''}
        </ul>
        <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>
        <p>Best regards,<br>Ritual Oysters Team</p>
      `
    })
    console.log('Client email sent successfully:', clientEmailResponse)

    // Send notification to admin
    console.log('Sending notification email to admin...')
    const adminEmailResponse = await resend.emails.send({
      from: 'Ritual Oysters Bookings <bookings@ritualoysters.com>',
      to: ['alex@ritualoysters.com', 'bookings@ritualoysters.com'],
      replyTo: data.email,
      subject: `🔔 New Booking Request - ${data.name} for ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">New Booking Request</h1>
          <h2 style="color: #666;">Client Details:</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</li>
            <li style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</li>
            <li style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</li>
            <li style="margin: 10px 0;"><strong>Guest Count:</strong> ${data.guestCount}</li>
            ${data.message ? `<li style="margin: 10px 0;"><strong>Additional Information:</strong> ${data.message}</li>` : ''}
          </ul>
          <div style="background-color: #f7f7f7; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; color: #333;"><strong>Action Required:</strong> Please review and respond to the client within 24 hours.</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #666;">Next Steps:</h3>
            <ol style="color: #333;">
              <li>Review the booking details above</li>
              <li>Check calendar availability</li>
              <li>Respond to the client within 24 hours</li>
              <li>Update the calendar event status (remove "PENDING" if confirmed)</li>
            </ol>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated notification from Ritual Oysters Booking System.</p>
          </div>
        </div>
      `
    })
    console.log('Admin email sent successfully:', adminEmailResponse)

    return NextResponse.json({ 
      success: true, 
      eventId: calendarResponse.data.id 
    })
  } catch (error: any) {
    console.error('Booking error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
    })
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process booking',
        details: error.response?.data || 'No additional details available'
      },
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