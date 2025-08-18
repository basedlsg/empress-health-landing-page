import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({
        error: "Valid ID is required",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    const body = await request.json();
    const { text, timestamp } = body;

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

    // Prepare update data
    const updateData: any = {};
    
    if (text !== undefined) {
      if (typeof text !== 'string' || text.trim() === '') {
        return NextResponse.json({
          error: "Text must be a non-empty string",
          code: "INVALID_TEXT"
        }, { status: 400 });
      }
      updateData.text = text.trim();
    }

    if (timestamp !== undefined) {
      if (typeof timestamp !== 'string' || timestamp.trim() === '') {
        return NextResponse.json({
          error: "Timestamp must be a valid string",
          code: "INVALID_TIMESTAMP"
        }, { status: 400 });
      }
      updateData.timestamp = timestamp.trim();
    }

    // If no valid fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        error: "No valid fields provided for update",
        code: "NO_UPDATE_FIELDS"
      }, { status: 400 });
    }

    // Update the message
    const updated = await db.update(messages)
      .set(updateData)
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

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

    // Delete the message
    const deleted = await db.delete(messages)
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Message deleted successfully',
      deletedMessage: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}