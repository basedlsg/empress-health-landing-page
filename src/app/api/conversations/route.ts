import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { conversations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const results = await db.select()
      .from(conversations)
      .orderBy(desc(conversations.updatedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET conversations error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { title } = body;

    // Validate and sanitize inputs
    const sanitizedTitle = title ? title.toString().trim() : null;

    // Prepare data for insertion
    const insertData = {
      title: sanitizedTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newConversation = await db.insert(conversations)
      .values(insertData)
      .returning();

    return NextResponse.json(newConversation[0], { status: 201 });
  } catch (error) {
    console.error('POST conversations error:', error);
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

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if conversation exists
    const existingConversation = await db.select()
      .from(conversations)
      .where(eq(conversations.id, parseInt(id)))
      .limit(1);

    if (existingConversation.length === 0) {
      return NextResponse.json({ 
        error: 'Conversation not found' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { title } = body;

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) {
      updateData.title = title ? title.toString().trim() : null;
    }

    const updated = await db.update(conversations)
      .set(updateData)
      .where(eq(conversations.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT conversations error:', error);
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

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if conversation exists
    const existingConversation = await db.select()
      .from(conversations)
      .where(eq(conversations.id, parseInt(id)))
      .limit(1);

    if (existingConversation.length === 0) {
      return NextResponse.json({ 
        error: 'Conversation not found' 
      }, { status: 404 });
    }

    const deleted = await db.delete(conversations)
      .where(eq(conversations.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Conversation deleted successfully',
      deletedConversation: deleted[0]
    });
  } catch (error) {
    console.error('DELETE conversations error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}