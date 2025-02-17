import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const config = await request.json();

    // Insert the configuration into the "chatbot_configs" table
    const { data, error } = await supabase
      .from('chatbot_configs')
      .insert([
        {
          chatbot_name: config.chatbotName,
          personality: config.personality,
          tone: config.tone,
          instructions: config.instructions,
        }
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ savedConfig: data });
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
