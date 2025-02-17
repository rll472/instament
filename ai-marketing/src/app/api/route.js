import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Call the ChatGPT API endpoint with your OpenAI API key from .env.local
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // You can choose another model if needed
        messages,
        temperature: 0.7
      })
    });

    const data = await apiResponse.json();

    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const responseMessage = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : 'No response from ChatGPT API.';

    return NextResponse.json({ response: responseMessage });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
