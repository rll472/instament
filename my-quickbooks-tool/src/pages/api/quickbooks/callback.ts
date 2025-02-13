// pages/api/quickbooks/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, realmId } = req.query;

  if (!code || !realmId) {
    return res.status(400).send('Missing code or realmId');
  }

  // --- Your token exchange logic here ---
  // Assume tokenData is the result of the token exchange:
  const tokenData = {
    access_token: 'example_access_token',
    refresh_token: 'example_refresh_token',
    expires_in: 3600,
    x_refresh_token_expires_in: 7776000,
  };

  // Calculate expiry timestamps
  const now = new Date();
  const expiresAt = new Date(now.getTime() + tokenData.expires_in * 1000);
  const refreshExpiresAt = new Date(now.getTime() + tokenData.x_refresh_token_expires_in * 1000);

  // Insert token data into Supabase
  const { data, error } = await supabase.from('tokens').insert([
    {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      realm_id: realmId,
      expires_at: expiresAt,
      refresh_token_expires_at: refreshExpiresAt,
    },
  ]);

  if (error) {
    console.error('Error storing tokens:', error);
    return res.status(500).send('Error storing tokens');
  }

  console.log('Tokens stored successfully:', data);

  // Redirect to dashboard or display a success message
  res.writeHead(302, { Location: `/dashboard?status=success` });
  res.end();
}
