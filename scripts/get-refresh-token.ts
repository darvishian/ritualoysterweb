const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

// Add this to debug
console.log('Checking environment variables:');
console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
console.log('Redirect URI:', process.env.GOOGLE_REDIRECT_URI);

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate the URL for user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ],
});

console.log('Visit this URL to get the authorization code:', authUrl);

// After you get the code, run this with your code:
// Replace YOUR_AUTH_CODE with the code you got from the URL
const code = '4/0AeanS0anFhLlFVdxbxFSSMHO5SxpazqpPpWPnv1lwWOPGEHmrloFCrHlUI-lUe8xtaBUGg';

async function getToken() {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);
  } catch (error: any) {
    console.error('Error getting token:', error?.message || 'Unknown error');
  }
}

getToken(); 