import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pods, podMemberships } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('userId');
    const podId = params.id;

    // Validate podId
    if (!podId || isNaN(parseInt(podId))) {
      return NextResponse.json({
        error: "Valid pod ID is required",
        code: "INVALID_POD_ID"
      }, { status: 400 });
    }

    // Validate userId
    if (!userIdParam || isNaN(parseInt(userIdParam))) {
      return NextResponse.json({
        error: "Valid userId is required",
        code: "INVALID_USER_ID"
      }, { status: 400 });
    }

    const userId = parseInt(userIdParam);
    const podIdInt = parseInt(podId);

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

    // Check if user is a member of the pod
    const membership = await db.select()
      .from(podMemberships)
      .where(
        and(
          eq(podMemberships.userId, userId),
          eq(podMemberships.podId, podIdInt)
        )
      )
      .limit(1);

    const isMember = membership.length > 0;

    return NextResponse.json({
      isMember,
      membership: isMember ? membership[0] : null
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}