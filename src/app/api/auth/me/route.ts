import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');

    if (!authCookie) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    try {
        const userData = JSON.parse(Buffer.from(authCookie.value, 'base64').toString());
        return NextResponse.json({
            user: {
                userId: userData.userId || null,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                tenantId: userData.tenantId,
                tenantName: userData.tenantName || '',
            }
        });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}
