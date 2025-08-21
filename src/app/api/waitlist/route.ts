import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Stub implementation - would normally save to database
    console.log('Adding to waitlist:', email);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error adding document: ', error);
    return NextResponse.json({ error: 'Failed to join the waitlist' }, { status: 500 });
  }
}