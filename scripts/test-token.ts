const { google: googleApi } = require('googleapis');
const { OAuth2Client: GoogleAuth } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function testToken() {
  try {
    const oauth2Client = new GoogleAuth(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const calendar = googleApi.calendar({ version: 'v3', auth: oauth2Client });

    // Try to list calendars to test the token
    const response = await calendar.calendarList.list();
    console.log('Token is valid! Found', response.data.items.length, 'calendars');
  } catch (error: any) {
    console.error('Token verification failed:', error?.message || 'Unknown error');
  }
}

testToken(); 