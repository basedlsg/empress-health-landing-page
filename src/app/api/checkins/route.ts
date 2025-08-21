import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateAnonId } from '@/lib/anon';

export async function POST(req: NextRequest) {
  const { hotFlashes, sleep, mood, adherence, note } = await req.json();
  const anonId = getOrCreateAnonId();

  if (!hotFlashes || !sleep || !mood) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Stub implementation - would normally save to database
    console.log('Saving check-in for user:', anonId, { hotFlashes, sleep, mood, adherence, note });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving check-in: ', error);
    return NextResponse.json({ error: 'Failed to save check-in' }, { status: 500 });
  }
}