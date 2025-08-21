import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getOrCreateAnonId } from '@/lib/anon';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const systemPrompt = `You are **Empress Sense**, an educational menopause wellness guide. Provide clear, compassionate, evidence-aware coaching for symptoms (hot flashes, sleep, mood). Use structure/function language—no diagnosis, no medication dosing, no medical claims. Keep replies under 180 words, offer 1–3 concrete actions, and suggest seeing a clinician for red-flags. Cite Empress content or general wellness principles; if unsure, say so.`;

export async function POST(req: NextRequest) {
  const { question, anonId: providedAnonId } = await req.json();
  const anonId = providedAnonId || getOrCreateAnonId();

  if (!question) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }

  try {
    const result = await model.generateContent([systemPrompt, question]);
    const response = result.response;
    const text = response.text();

    // Stub implementation - would normally save to database
    console.log('Saving conversation for user:', anonId, { question, answer: text });

    return NextResponse.json({ answer: text }, { status: 200 });
  } catch (error) {
    console.error('Error generating content: ', error);
    return NextResponse.json({ error: 'Failed to get answer' }, { status: 500 });
  }
}