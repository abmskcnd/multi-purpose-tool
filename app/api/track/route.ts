import { NextRequest, NextResponse } from 'next/server';

interface TrackEventBody {
  name: string;
  params?: Record<string, unknown>;
  timestamp?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TrackEventBody = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Event name is required' },
        { status: 400 }
      );
    }

    // Log the event (in production, this would go to analytics service)
    console.log('[Analytics]', {
      name: body.name,
      params: body.params,
      timestamp: body.timestamp || new Date().toISOString(),
    });

    // TODO: Store to Supabase analytics table
    // TODO: Forward to Google Analytics

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
    });
  } catch (error) {
    console.error('[Analytics Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
