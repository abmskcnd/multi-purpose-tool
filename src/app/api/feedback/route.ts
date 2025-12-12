import { NextRequest, NextResponse } from 'next/server';

interface FeedbackBody {
  type: 'bug' | 'feature' | 'general';
  message: string;
  email?: string;
  toolId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackBody = await request.json();

    // Validate required fields
    if (!body.type || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Type and message are required' },
        { status: 400 }
      );
    }

    // Log the feedback (in production, this would go to database)
    console.log('[Feedback]', {
      type: body.type,
      message: body.message,
      email: body.email,
      toolId: body.toolId,
      timestamp: new Date().toISOString(),
    });

    // TODO: Store to Supabase feedback table
    // TODO: Send email notification

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });
  } catch (error) {
    console.error('[Feedback Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
