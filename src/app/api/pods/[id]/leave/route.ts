import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pods, podMemberships } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    
    // Validate podId from URL params
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({
        error: "Valid pod ID is required",
        code: "INVALID_POD_ID"
      }, { status: 400 });
    }

    const podId = parseInt(id);

    // Get userId from query params or request body
    let userId = searchParams.get('userId');
    
    if (!userId) {
      // Try to get from request body
      try {
        const text = await request.text();
        if (text) {
          const body = JSON.parse(text);
          userId = body.userId;
        }
      } catch (error) {
        // Ignore JSON parse errors, userId will remain null
      }
    }

    // Validate userId
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json({
        error: "Valid userId is required (provide via query param ?userId=X or request body)",
        code: "INVALID_USER_ID"
      }, { status: 400 });
    }

    const userIdInt = parseInt(userId);

    // Check if pod exists
    const pod = await db.select()
      .from(pods)
      .where(eq(pods.id, podId))
      .limit(1);

    if (pod.length === 0) {
      return NextResponse.json({
        error: "Pod not found",
        code: "POD_NOT_FOUND"
      }, { status: 404 });
    }

    // Check if user is actually a member of the pod
    const membership = await db.select()
      .from(podMemberships)
      .where(
        and(
          eq(podMemberships.userId, userIdInt),
          eq(podMemberships.podId, podId)
        )
      )
      .limit(1);

    if (membership.length === 0) {
      return NextResponse.json({
        error: "User is not a member of this pod",
        code: "NOT_A_MEMBER"
      }, { status: 404 });
    }

    // Delete the membership
    const deleted = await db.delete(podMemberships)
      .where(
        and(
          eq(podMemberships.userId, userIdInt),
          eq(podMemberships.podId, podId)
        )
      )
      .returning();

    return NextResponse.json({
      message: "Successfully left the pod",
      deletedMembership: deleted[0],
      podName: pod[0].name
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE pod membership error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}