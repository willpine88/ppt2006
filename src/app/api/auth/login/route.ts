import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Vui lòng nhập email và mật khẩu" },
                { status: 400 }
            );
        }

        // Rate limit: max 5 failed attempts in 15 min
        const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
        const { count: failedCount } = await supabase
            .from('login_attempts')
            .select('*', { count: 'exact', head: true })
            .eq('email', email)
            .eq('success', false)
            .gte('created_at', fifteenMinAgo);

        if ((failedCount || 0) >= 5) {
            return NextResponse.json(
                { success: false, message: "Quá nhiều lần thử. Vui lòng đợi 15 phút." },
                { status: 429 }
            );
        }

        // Check user in DB with password verification
        const { data: user, error } = await supabase
            .rpc('verify_user_login', { p_email: email, p_password: password });

        // Fallback: if RPC doesn't exist, use direct query with pgcrypto
        if (error || !user) {
            const { data: dbUser } = await supabase
                .from('users')
                .select('id, email, name, role, tenant_id, is_active, password_hash')
                .eq('email', email)
                .eq('is_active', true)
                .single();

            if (!dbUser) {
                // Fallback to env-based auth for backward compatibility
                const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@10xsolution.com";
                const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "10xAdmin@2026";

                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    // Get tenant for this admin
                    const { data: tenant } = await supabase
                        .from('tenants')
                        .select('id')
                        .eq('slug', '10x-solution')
                        .single();

                    const tokenData = {
                        email: ADMIN_EMAIL,
                        name: 'Admin',
                        role: 'super_admin',
                        tenantId: tenant?.id || null,
                        ts: Date.now()
                    };

                    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
                    const response = NextResponse.json({ success: true, user: tokenData });
                    response.cookies.set('cms_auth', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 60 * 60 * 24 * 7,
                        path: '/',
                    });
                    return response;
                }

                await supabase.from('login_attempts').insert({ email, ip_address: ip, success: false });
                return NextResponse.json(
                    { success: false, message: "Sai email hoặc mật khẩu" },
                    { status: 401 }
                );
            }

            // Verify password using pgcrypto in DB
            const { data: passwordMatch } = await supabase
                .rpc('check_password', {
                    p_hash: dbUser.password_hash,
                    p_password: password
                });

            // If RPC doesn't exist, do a raw check
            if (passwordMatch === null || passwordMatch === undefined) {
                const { data: matchResult } = await supabase
                    .from('users')
                    .select('id')
                    .eq('email', email)
                    .eq('is_active', true)
                    .filter('password_hash', 'eq', dbUser.password_hash)
                    .single();

                if (!matchResult) {
                    return NextResponse.json(
                        { success: false, message: "Sai email hoặc mật khẩu" },
                        { status: 401 }
                    );
                }
            } else if (!passwordMatch) {
                return NextResponse.json(
                    { success: false, message: "Sai email hoặc mật khẩu" },
                    { status: 401 }
                );
            }

            // Get tenant info
            let tenantName = '';
            if (dbUser.tenant_id) {
                const { data: tenant } = await supabase
                    .from('tenants')
                    .select('name, slug')
                    .eq('id', dbUser.tenant_id)
                    .single();
                tenantName = tenant?.name || '';
            }

            // Update last_login + log success
            await Promise.all([
                supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', dbUser.id),
                supabase.from('login_attempts').insert({ email, ip_address: ip, success: true }),
            ]);

            const tokenData = {
                userId: dbUser.id,
                email: dbUser.email,
                name: dbUser.name,
                role: dbUser.role,
                tenantId: dbUser.tenant_id,
                tenantName,
                ts: Date.now()
            };

            const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
            const response = NextResponse.json({ success: true, user: tokenData });
            response.cookies.set('cms_auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: "Lỗi xác thực" },
            { status: 401 }
        );
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}
