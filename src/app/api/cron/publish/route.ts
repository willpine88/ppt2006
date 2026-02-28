export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { checkAndPublishScheduledPosts } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    // Basic auth check
    const cronSecret = process.env.CRON_SECRET || 'cms-cron-secret-2026';
    if (key !== cronSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await checkAndPublishScheduledPosts();
        return NextResponse.json({
            success: true,
            published: result.published,
            posts: result.posts,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Cron publish error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
