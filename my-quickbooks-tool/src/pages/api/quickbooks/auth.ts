// pages/api/quickbooks/auth.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve environment variables
  const clientId = process.env.QB_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI; // e.g., http://localhost:3000/api/quickbooks/callback

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Missing required environment variables' });
  }

  // QuickBooks OAuth2 details
  const baseUrl = 'https://appcenter.intuit.com/connect/oauth2';
  const responseType = 'code'; // OAuth2 code grant
  const scope = 'com.intuit.quickbooks.accounting openid profile email'; // Adjust scopes as needed
  const state = 'security_token'; // You can generate a random string here for CSRF protection

  // Build the query parameters using URLSearchParams
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: responseType,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  // Construct the full authorization URL
  const authUrl = `${baseUrl}?${params.toString()}`;

  // Return the URL as JSON so the frontend can use it to redirect the user
  res.status(200).json({ url: authUrl });
}
