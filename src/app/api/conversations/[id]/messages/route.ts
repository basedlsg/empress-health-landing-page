import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { messages, conversations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const db = getDb();
    const body = await request.json();
    const { speaker, text, timestamp } = body;
    const conversationId = id;

    // Validate required fields
    if (!conversationId || isNaN(parseInt(conversationId))) {
      return NextResponse.json({ 
        error: "Valid conversation ID is required",
        code: "INVALID_CONVERSATION_ID" 
      }, { status: 400 });
    }

    if (!speaker) {
      return NextResponse.json({ 
        error: "Speaker is required",
        code: "MISSING_SPEAKER" 
      }, { status: 400 });
    }

    if (!text || text.trim() === '') {
      return NextResponse.json({ 
        error: "Text is required and cannot be empty",
        code: "MISSING_TEXT" 
      }, { status: 400 });
    }

    if (!timestamp) {
      return NextResponse.json({ 
        error: "Timestamp is required",
        code: "MISSING_TIMESTAMP" 
      }, { status: 400 });
    }

    // Validate speaker value
    if (speaker !== 'user' && speaker !== 'assistant') {
      return NextResponse.json({ 
        error: "Speaker must be either 'user' or 'assistant'",
        code: "INVALID_SPEAKER" 
      }, { status: 400 });
    }

    // Check if conversation exists
    const existingConversation = await db.select()
      .from(conversations)
      .where(eq(conversations.id, parseInt(conversationId)))
      .limit(1);

    if (existingConversation.length === 0) {
      return NextResponse.json({ 
        error: "Conversation not found",
        code: "CONVERSATION_NOT_FOUND" 
      }, { status: 404 });
    }

    // Create new message
    const newMessage = await db.insert(messages)
      .values({
        conversationId: parseInt(conversationId),
        speaker: speaker.trim(),
        text: text.trim(),
        timestamp: timestamp,
        createdAt: new Date().toISOString()
      })
      .returning();

    // Update parent conversation's updatedAt
    await db.update(conversations)
      .set({
        updatedAt: new Date().toISOString()
      })
      .where(eq(conversations.id, parseInt(conversationId)));

    return NextResponse.json(newMessage[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}