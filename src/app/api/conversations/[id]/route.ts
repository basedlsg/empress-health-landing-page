import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { conversations, messages } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID parameter from path
    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid conversation ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const conversationId = parseInt(id);

    // Fetch conversation by ID
    const conversation = await db.select()
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);

    if (conversation.length === 0) {
      return NextResponse.json({ 
        error: 'Conversation not found' 
      }, { status: 404 });
    }

    // Fetch all messages for this conversation ordered by timestamp
    const conversationMessages = await db.select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.timestamp));

    // Combine conversation details with messages
    const result = {
      id: conversation[0].id,
      title: conversation[0].title,
      createdAt: conversation[0].createdAt,
      updatedAt: conversation[0].updatedAt,
      messages: conversationMessages.map(message => ({
        id: message.id,
        conversationId: message.conversationId,
        speaker: message.speaker,
        text: message.text,
        timestamp: message.timestamp,
        createdAt: message.createdAt
      }))
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('GET conversation error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}