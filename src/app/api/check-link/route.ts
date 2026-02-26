import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; 10xSolutionCMS/1.0; LinkChecker)',
            },
        });

        clearTimeout(timeout);

        return NextResponse.json({
            ok: response.ok,
            status: response.status,
            redirected: response.redirected,
            finalUrl: response.url,
        });
    } catch (error: any) {
        // If HEAD fails, try GET (some servers don't support HEAD)
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(url, {
                method: 'GET',
                redirect: 'follow',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; 10xSolutionCMS/1.0; LinkChecker)',
                },
            });

            clearTimeout(timeout);

            return NextResponse.json({
                ok: response.ok,
                status: response.status,
                redirected: response.redirected,
                finalUrl: response.url,
            });
        } catch {
            return NextResponse.json({
                ok: false,
                status: 0,
                error: error?.message || 'Connection failed',
            });
        }
    }
}
