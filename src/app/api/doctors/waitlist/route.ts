import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { doctorsWaitlist } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, specialty } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({
        error: "Email is required",
        code: "MISSING_EMAIL"
      }, { status: 400 });
    }

    if (!specialty) {
      return NextResponse.json({
        error: "Specialty is required",
        code: "MISSING_SPECIALTY"
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSpecialty = specialty.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json({
        error: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT"
      }, { status: 400 });
    }

    // Validate specialty is not empty after trimming
    if (sanitizedSpecialty.length === 0) {
      return NextResponse.json({
        error: "Specialty cannot be empty",
        code: "EMPTY_SPECIALTY"
      }, { status: 400 });
    }

    // Check for existing email
    const existingEntry = await db.select()
      .from(doctorsWaitlist)
      .where(eq(doctorsWaitlist.email, sanitizedEmail))
      .limit(1);

    if (existingEntry.length > 0) {
      return NextResponse.json({
        error: "Email already exists in waitlist",
        code: "DUPLICATE_EMAIL"
      }, { status: 400 });
    }

    // Create new waitlist entry
    const newEntry = await db.insert(doctorsWaitlist)
      .values({
        email: sanitizedEmail,
        specialty: sanitizedSpecialty,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newEntry[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}