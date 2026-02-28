export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/activity — Get activity logs
export async function GET(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let tenantId: string | null = null;
    let role = '';
    try {
        const userData = JSON.parse(Buffer.from(authCookie.value, 'base64').toString());
        tenantId = userData.tenantId;
        role = userData.role;
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
        .from('activity_logs')
        .select('*, users(name, email)')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (role !== 'super_admin' && tenantId) {
        query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ logs: data || [] });
}

// POST /api/activity — Log an action
export async function POST(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const userData = JSON.parse(Buffer.from(authCookie.value, 'base64').toString());
        const body = await request.json();

        await supabase.from('activity_logs').insert({
            user_id: userData.userId || null,
            tenant_id: userData.tenantId || null,
            action: body.action,
            entity_type: body.entityType || null,
            entity_id: body.entityId || null,
            details: body.details || {},
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
