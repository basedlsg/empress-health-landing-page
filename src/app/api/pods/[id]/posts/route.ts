import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { podPosts, pods, podMemberships } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDb();
    const { id } = await params;
    const podId = id;
    const { searchParams } = new URL(request.url);
    
    // Validate pod ID
    if (!podId || isNaN(parseInt(podId))) {
      return NextResponse.json({ 
        error: "Valid pod ID is required",
        code: "INVALID_POD_ID" 
      }, { status: 400 });
    }

    // Check if pod exists
    const pod = await db.select()
      .from(pods)
      .where(eq(pods.id, parseInt(podId)))
      .limit(1);

    if (pod.length === 0) {
      return NextResponse.json({ 
        error: 'Pod not found' 
      }, { status: 404 });
    }

    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get posts for the pod ordered by timestamp descending
    const posts = await db.select()
      .from(podPosts)
      .where(eq(podPosts.podId, parseInt(podId)))
      .orderBy(desc(podPosts.timestamp))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(posts);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDb();
    const { id } = await params;
    const podId = id;
    
    // Validate pod ID
    if (!podId || isNaN(parseInt(podId))) {
      return NextResponse.json({ 
        error: "Valid pod ID is required",
        code: "INVALID_POD_ID" 
      }, { status: 400 });
    }

    const body = await request.json();
    const { userId, text } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ 
        error: "User ID is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!text) {
      return NextResponse.json({ 
        error: "Text is required",
        code: "MISSING_TEXT" 
      }, { status: 400 });
    }

    // Validate text constraints
    const trimmedText = text.trim();
    if (!trimmedText) {
      return NextResponse.json({ 
        error: "Text cannot be empty",
        code: "EMPTY_TEXT" 
      }, { status: 400 });
    }

    if (trimmedText.length > 1000) {
      return NextResponse.json({ 
        error: "Text cannot exceed 1000 characters",
        code: "TEXT_TOO_LONG" 
      }, { status: 400 });
    }

    // Check if pod exists
    const pod = await db.select()
      .from(pods)
      .where(eq(pods.id, parseInt(podId)))
      .limit(1);

    if (pod.length === 0) {
      return NextResponse.json({ 
        error: 'Pod not found' 
      }, { status: 404 });
    }

    // Check if user is a member of the pod
    const membership = await db.select()
      .from(podMemberships)
      .where(
        and(
          eq(podMemberships.userId, userId),
          eq(podMemberships.podId, parseInt(podId))
        )
      )
      .limit(1);

    if (membership.length === 0) {
      return NextResponse.json({ 
        error: 'User is not a member of this pod',
        code: "NOT_MEMBER" 
      }, { status: 403 });
    }

    // Create the post
    const currentTimestamp = new Date().toISOString();
    
    const newPost = await db.insert(podPosts)
      .values({
        userId: userId,
        podId: parseInt(podId),
        text: trimmedText,
        timestamp: currentTimestamp,
        createdAt: currentTimestamp
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}