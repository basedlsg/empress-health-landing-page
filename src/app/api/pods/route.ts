import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pods } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single pod fetch
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const pod = await db.select()
        .from(pods)
        .where(eq(pods.id, parseInt(id)))
        .limit(1);

      if (pod.length === 0) {
        return NextResponse.json({ error: 'Pod not found' }, { status: 404 });
      }

      return NextResponse.json(pod[0]);
    }

    // List pods with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = db.select().from(pods);
    
    if (search) {
      query = query.where(
        or(
          like(pods.name, `%${search}%`),
          like(pods.topic, `%${search}%`)
        )
      );
    }

    const results = await query
      .orderBy(desc(pods.createdAt))
      .limit(limit)
      .offset(offset);

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
    const body = await request.json();
    const { name, topic } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ 
        error: "Name is required and cannot be empty",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json({ 
        error: "Topic is required and cannot be empty",
        code: "MISSING_TOPIC" 
      }, { status: 400 });
    }

    // Create new pod
    const newPod = await db.insert(pods)
      .values({
        name: name.trim(),
        topic: topic.trim(),
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newPod[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if pod exists
    const existingPod = await db.select()
      .from(pods)
      .where(eq(pods.id, parseInt(id)))
      .limit(1);

    if (existingPod.length === 0) {
      return NextResponse.json({ error: 'Pod not found' }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and prepare updates
    if (body.name !== undefined) {
      if (typeof body.name !== 'string' || body.name.trim() === '') {
        return NextResponse.json({ 
          error: "Name cannot be empty",
          code: "INVALID_NAME" 
        }, { status: 400 });
      }
      updates.name = body.name.trim();
    }

    if (body.topic !== undefined) {
      if (typeof body.topic !== 'string' || body.topic.trim() === '') {
        return NextResponse.json({ 
          error: "Topic cannot be empty",
          code: "INVALID_TOPIC" 
        }, { status: 400 });
      }
      updates.topic = body.topic.trim();
    }

    // Update pod
    const updatedPod = await db.update(pods)
      .set(updates)
      .where(eq(pods.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPod[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if pod exists
    const existingPod = await db.select()
      .from(pods)
      .where(eq(pods.id, parseInt(id)))
      .limit(1);

    if (existingPod.length === 0) {
      return NextResponse.json({ error: 'Pod not found' }, { status: 404 });
    }

    // Delete pod
    const deletedPod = await db.delete(pods)
      .where(eq(pods.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Pod deleted successfully',
      pod: deletedPod[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}