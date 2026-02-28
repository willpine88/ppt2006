export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST /api/auth/change-password
export async function POST(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) {
        return NextResponse.json({ success: false, message: 'Chưa đăng nhập' }, { status: 401 });
    }

    let userId: string;
    try {
        const userData = JSON.parse(Buffer.from(authCookie.value, 'base64').toString());
        userId = userData.userId;
        if (!userId) throw new Error('No userId');
    } catch {
        return NextResponse.json({ success: false, message: 'Token không hợp lệ' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
        return NextResponse.json({ success: false, message: 'Thiếu thông tin' }, { status: 400 });
    }

    if (newPassword.length < 6) {
        return NextResponse.json({ success: false, message: 'Mật khẩu mới phải ít nhất 6 ký tự' }, { status: 400 });
    }

    // Verify current password
    const { data: user } = await supabase.from('users').select('password_hash').eq('id', userId).single();
    if (!user) {
        return NextResponse.json({ success: false, message: 'User không tồn tại' }, { status: 404 });
    }

    const { data: isCorrect } = await supabase.rpc('check_password', {
        p_hash: user.password_hash,
        p_password: currentPassword,
    });

    if (!isCorrect) {
        return NextResponse.json({ success: false, message: 'Mật khẩu hiện tại không đúng' }, { status: 401 });
    }

    // Update password
    const { error } = await supabase.rpc('update_password', {
        p_user_id: userId,
        p_new_password: newPassword,
    });

    if (error) {
        // Fallback if function doesn't exist yet
        return NextResponse.json({ success: false, message: 'Lỗi cập nhật. Chạy migration 006.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Đã đổi mật khẩu' });
}
