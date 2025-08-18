import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { podMemberships, pods } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const podId = params.id;
    
    // Validate podId
    if (!podId || isNaN(parseInt(podId))) {
      return NextResponse.json({
        error: "Valid pod ID is required",
        code: "INVALID_POD_ID"
      }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    const { userId } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({
        error: "userId is required",
        code: "MISSING_USER_ID"
      }, { status: 400 });
    }

    if (isNaN(parseInt(userId))) {
      return NextResponse.json({
        error: "Valid userId is required",
        code: "INVALID_USER_ID"
      }, { status: 400 });
    }

    const podIdInt = parseInt(podId);
    const userIdInt = parseInt(userId);

    // Check if pod exists
    const pod = await db.select()
      .from(pods)
      .where(eq(pods.id, podIdInt))
      .limit(1);

    if (pod.length === 0) {
      return NextResponse.json({
        error: "Pod not found",
        code: "POD_NOT_FOUND"
      }, { status: 404 });
    }

    // Check if user is already a member
    const existingMembership = await db.select()
      .from(podMemberships)
      .where(
        and(
          eq(podMemberships.userId, userIdInt),
          eq(podMemberships.podId, podIdInt)
        )
      )
      .limit(1);

    if (existingMembership.length > 0) {
      return NextResponse.json({
        error: "User is already a member of this pod",
        code: "ALREADY_MEMBER"
      }, { status: 409 });
    }

    // Create membership record
    const newMembership = await db.insert(podMemberships)
      .values({
        userId: userIdInt,
        podId: podIdInt,
        joinedAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newMembership[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}