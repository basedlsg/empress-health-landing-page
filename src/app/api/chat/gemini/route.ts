import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, systemPrompt } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Maximum 1000 characters allowed.' },
        { status: 400 }
      );
    }

    const defaultSystemPrompt = "Empress Sense: compassionate menopause guide. Provide structure/function advice, no diagnosis, ≤180 words.";
    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: finalSystemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I am ready to help." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text
    });

  } catch (error: unknown) {
    console.error('Gemini API route error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('timeout') || errorMessage.includes('AbortError')) {
      return NextResponse.json(
        { error: 'Request timeout. Please try again.', code: 'TIMEOUT' },
        { status: 408 }
      );
    }
    
    if (errorMessage.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error. Please check your connection and try again.', code: 'NETWORK_ERROR' },
        { status: 503 }
      );
    }
    
    if (errorMessage.includes('JSON')) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  );
}