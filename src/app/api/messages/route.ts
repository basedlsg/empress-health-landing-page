import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { messages, conversations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getMessages } from '@/lib/query-helpers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Parse filter parameters
    const conversationId = searchParams.get('conversationId');
    
    // Validate conversationId if provided
    if (conversationId && isNaN(parseInt(conversationId))) {
      return NextResponse.json({ 
        error: "Valid conversationId is required",
        code: "INVALID_CONVERSATION_ID" 
      }, { status: 400 });
    }

    // Use helper function to avoid type conflicts
    const results = await getMessages({
      conversationId: conversationId || undefined,
      limit,
      offset
    });

    return NextResponse.json(results);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    
    // Validate required fields
    if (!body.conversationId || isNaN(parseInt(body.conversationId))) {
      return NextResponse.json({ 
        error: "Valid conversationId is required",
        code: "MISSING_CONVERSATION_ID" 
      }, { status: 400 });
    }

    if (!body.speaker || typeof body.speaker !== 'string' || !body.speaker.trim()) {
      return NextResponse.json({ 
        error: "Speaker is required",
        code: "MISSING_SPEAKER" 
      }, { status: 400 });
    }

    if (!body.text || typeof body.text !== 'string' || !body.text.trim()) {
      return NextResponse.json({ 
        error: "Message text is required",
        code: "MISSING_TEXT" 
      }, { status: 400 });
    }

    // Verify conversation exists
    const existingConversation = await db.select()
      .from(conversations)
      .where(eq(conversations.id, parseInt(body.conversationId)))
      .limit(1);

    if (existingConversation.length === 0) {
      return NextResponse.json({ 
        error: "Conversation not found",
        code: "CONVERSATION_NOT_FOUND" 
      }, { status: 404 });
    }

    // Sanitize inputs
    const speaker = body.speaker.trim();
    const text = body.text.trim();
    const timestamp = body.timestamp || new Date().toISOString();
    const createdAt = new Date().toISOString();

    // Insert new message
    const newMessage = await db.insert(messages)
      .values({
        conversationId: parseInt(body.conversationId),
        speaker,
        text,
        timestamp,
        createdAt
      })
      .returning();

    return NextResponse.json(newMessage[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if message exists
    const existingMessage = await db.select()
      .from(messages)
      .where(eq(messages.id, parseInt(id)))
      .limit(1);

    if (existingMessage.length === 0) {
      return NextResponse.json({ 
        error: 'Message not found' 
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and prepare updates
    if (body.conversationId !== undefined) {
      if (isNaN(parseInt(body.conversationId))) {
        return NextResponse.json({ 
          error: "Valid conversationId is required",
          code: "INVALID_CONVERSATION_ID" 
        }, { status: 400 });
      }
      
      // Verify conversation exists
      const existingConversation = await db.select()
        .from(conversations)
        .where(eq(conversations.id, parseInt(body.conversationId)))
        .limit(1);

      if (existingConversation.length === 0) {
        return NextResponse.json({ 
          error: "Conversation not found",
          code: "CONVERSATION_NOT_FOUND" 
        }, { status: 404 });
      }
      
      updates.conversationId = parseInt(body.conversationId);
    }

    if (body.speaker !== undefined) {
      if (!body.speaker || typeof body.speaker !== 'string' || !body.speaker.trim()) {
        return NextResponse.json({ 
          error: "Speaker cannot be empty",
          code: "INVALID_SPEAKER" 
        }, { status: 400 });
      }
      updates.speaker = body.speaker.trim();
    }

    if (body.text !== undefined) {
      if (!body.text || typeof body.text !== 'string' || !body.text.trim()) {
        return NextResponse.json({ 
          error: "Message text cannot be empty",
          code: "INVALID_TEXT" 
        }, { status: 400 });
      }
      updates.text = body.text.trim();
    }

    if (body.timestamp !== undefined) {
      updates.timestamp = body.timestamp;
    }

    // Update message
    const updated = await db.update(messages)
      .set(updates)
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if message exists
    const existingMessage = await db.select()
      .from(messages)
      .where(eq(messages.id, parseInt(id)))
      .limit(1);

    if (existingMessage.length === 0) {
      return NextResponse.json({ 
        error: 'Message not found' 
      }, { status: 404 });
    }

    // Delete message
    const deleted = await db.delete(messages)
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Message deleted successfully',
      deletedRecord: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}