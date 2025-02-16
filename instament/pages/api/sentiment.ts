// pages/api/sentiment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  sentiment?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing text in request body' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing API key');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a sentiment analysis assistant. Analyze the sentiment of the following text.  Make a determination if the overall sentiment by most of the commenters is supportive, not supportive, entertaining, funny, apalling, repulsed, love it, want more of it, hate it, or any other mood that strikes the coversation. ',
          },
          { role: 'user', content: text },
        ],
        temperature: 0,
        max_tokens: 50,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Error calling OpenAI API');
    }

    // Extract the sentiment analysis result from the response
    const sentiment = data.choices?.[0]?.message?.content || 'No sentiment found';
    return res.status(200).json({ sentiment });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
