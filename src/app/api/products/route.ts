import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/query-helpers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    // Use helper function to avoid type conflicts
    const results = await getProducts({
      search: search || undefined,
      limit,
      offset
    });

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET products error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_ERROR'
      }, 
      { status: 500 }
    );
  }
}