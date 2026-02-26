"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Activity, Database, HardDrive, Clock, CheckCircle2,
    XCircle, AlertTriangle, RefreshCw, Server,
    Image as ImageIcon, FileText, FolderOpen, Tags,
    Globe, Shield, Loader2, Download, Upload,
} from "lucide-react";

interface SystemCheck {
    name: string;
    status: 'ok' | 'warning' | 'error' | 'checking';
    message: string;
    icon: React.ReactNode;
    details?: string;
}

export default function SystemStatusPage() {
    const [checks, setChecks] = useState<SystemCheck[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastCheck, setLastCheck] = useState<string | null>(null);
    const [exporting, setExporting] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importResult, setImportResult] = useState<string | null>(null);
    const [dbStats, setDbStats] = useState({
        posts: 0, categories: 0, tags: 0, images: 0,
        published: 0, drafts: 0, scheduled: 0,
        storageUsed: '0 MB',
    });

    // ==================== BACKUP EXPORT ====================
    async function handleExportBackup() {
        setExporting(true);
        try {
            const [
                { data: posts },
                { data: categories },
                { data: tags },
                { data: scheduled },
                { data: pageContent },
                { data: siteSettings },
            ] = await Promise.all([
                supabase.from('posts').select('*').order('created_at', { ascending: false }),
                supabase.from('categories').select('*').order('name'),
                supabase.from('tags').select('*').order('name'),
                supabase.from('scheduled_content').select('*'),
                supabase.from('page_content').select('*'),
                supabase.from('site_settings').select('*'),
            ]);

            const backup = {
                _meta: {
                    cms: '10x Solution CMS',
                    version: '1.0',
                    exported_at: new Date().toISOString(),
                    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
                },
                posts: posts || [],
                categories: categories || [],
                tags: tags || [],
                scheduled_content: scheduled || [],
                page_content: pageContent || [],
                site_settings: siteSettings || [],
            };

            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const dateStr = new Date().toISOString().split('T')[0];
            a.href = url;
            a.download = `10x-cms-backup-${dateStr}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            alert('Lỗi export: ' + String(e));
        }
        setExporting(false);
    }

    // ==================== BACKUP IMPORT ====================
    async function handleImportBackup(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!confirm('⚠️ Import sẽ THÊM dữ liệu vào database hiện tại (dữ liệu trùng slug sẽ được cập nhật). Tiếp tục?')) return;

        setImporting(true);
        setImportResult(null);

        try {
            const text = await file.text();
            const backup = JSON.parse(text);
            const results: string[] = [];

            if (backup.categories?.length > 0) {
                const { error } = await supabase.from('categories').upsert(backup.categories, { onConflict: 'slug' });
                results.push(error ? `❌ Categories: ${error.message}` : `✅ Categories: ${backup.categories.length} bản ghi`);
            }
            if (backup.tags?.length > 0) {
                const { error } = await supabase.from('tags').upsert(backup.tags, { onConflict: 'slug' });
                results.push(error ? `❌ Tags: ${error.message}` : `✅ Tags: ${backup.tags.length} bản ghi`);
            }
            if (backup.posts?.length > 0) {
                const { error } = await supabase.from('posts').upsert(backup.posts, { onConflict: 'slug' });
                results.push(error ? `❌ Posts: ${error.message}` : `✅ Posts: ${backup.posts.length} bản ghi`);
            }
            if (backup.scheduled_content?.length > 0) {
                const { error } = await supabase.from('scheduled_content').upsert(backup.scheduled_content, { onConflict: 'id' });
                results.push(error ? `❌ Scheduled: ${error.message}` : `✅ Scheduled: ${backup.scheduled_content.length} bản ghi`);
            }
            if (backup.site_settings?.length > 0) {
                const { error } = await supabase.from('site_settings').upsert(backup.site_settings, { onConflict: 'key' });
                results.push(error ? `❌ Settings: ${error.message}` : `✅ Settings: ${backup.site_settings.length} bản ghi`);
            }
            setImportResult(results.join('\n'));
            runChecks();
        } catch (err) {
            setImportResult('❌ Lỗi đọc file: ' + String(err));
        }
        setImporting(false);
        e.target.value = '';
    }

    // ==================== HEALTH CHECKS ====================
    async function runChecks() {
        setLoading(true);
        const results: SystemCheck[] = [];

        // 1. Supabase
        try {
            const start = Date.now();
            const { error } = await supabase.from('posts').select('id', { count: 'exact', head: true });
            const latency = Date.now() - start;
            if (error) {
                results.push({ name: 'Kết nối Supabase', status: 'error', message: 'Không thể kết nối', icon: <Database size={18} />, details: error.message });
            } else {
                results.push({ name: 'Kết nối Supabase', status: latency < 2000 ? 'ok' : 'warning', message: `Kết nối ổn định (${latency}ms)`, icon: <Database size={18} />, details: `Phản hồi: ${latency}ms` });
            }
        } catch (e) {
            results.push({ name: 'Kết nối Supabase', status: 'error', message: 'Lỗi kết nối', icon: <Database size={18} />, details: String(e) });
        }

        // 2. Tables
        try {
            const [{ count: postsCount }, { count: pubCount }, { count: draftCount }, { count: catsCount }, { count: tagsCount }] = await Promise.all([
                supabase.from('posts').select('*', { count: 'exact', head: true }),
                supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
                supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', false),
                supabase.from('categories').select('*', { count: 'exact', head: true }),
                supabase.from('tags').select('*', { count: 'exact', head: true }),
            ]);
            const now = new Date().toISOString();
            const { count: scheduledCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', false).not('scheduled_at', 'is', null).gt('scheduled_at', now);
            setDbStats(prev => ({ ...prev, posts: postsCount || 0, published: pubCount || 0, drafts: draftCount || 0, scheduled: scheduledCount || 0, categories: catsCount || 0, tags: tagsCount || 0 }));
            results.push({ name: 'Bảng dữ liệu', status: 'ok', message: `${(postsCount || 0) + (catsCount || 0) + (tagsCount || 0)} bản ghi`, icon: <Server size={18} />, details: `Posts: ${postsCount || 0} | Categories: ${catsCount || 0} | Tags: ${tagsCount || 0}` });
        } catch (e) {
            results.push({ name: 'Bảng dữ liệu', status: 'error', message: 'Kiểm tra schema', icon: <Server size={18} />, details: String(e) });
        }

        // 3. Storage
        try {
            const { data: images, error } = await supabase.storage.from('post-images').list('', { limit: 500 });
            if (error) {
                results.push({ name: 'Storage', status: 'warning', message: 'Không truy cập bucket', icon: <HardDrive size={18} />, details: error.message });
            } else {
                const validImages = (images || []).filter(f => f.name && !f.name.startsWith('.'));
                const totalSize = validImages.reduce((sum, f) => sum + ((f.metadata as any)?.size || 0), 0);
                const sizeStr = totalSize > 1048576 ? `${(totalSize / 1048576).toFixed(1)} MB` : `${(totalSize / 1024).toFixed(0)} KB`;
                setDbStats(prev => ({ ...prev, images: validImages.length, storageUsed: sizeStr }));
                results.push({ name: 'Storage', status: 'ok', message: `${validImages.length} ảnh — ${sizeStr}`, icon: <HardDrive size={18} />, details: `Bucket: post-images` });
            }
        } catch (e) {
            results.push({ name: 'Storage', status: 'error', message: 'Lỗi', icon: <HardDrive size={18} />, details: String(e) });
        }

        // 4. Cron
        try {
            const res = await fetch(`/api/cron/publish?key=${process.env.NEXT_PUBLIC_CRON_SECRET || 'cms-cron-secret-2026'}`);
            const data = await res.json();
            results.push(res.ok
                ? { name: 'Auto-Publish', status: 'ok' as const, message: data.published > 0 ? `Đã xuất bản ${data.published} bài` : 'Bình thường', icon: <Clock size={18} />, details: '/api/cron/publish' }
                : { name: 'Auto-Publish', status: 'warning' as const, message: `HTTP ${res.status}`, icon: <Clock size={18} /> }
            );
        } catch (e) {
            results.push({ name: 'Auto-Publish', status: 'error', message: 'Lỗi cron', icon: <Clock size={18} />, details: String(e) });
        }

        // 5. Env
        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
        const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        results.push({ name: 'Biến môi trường', status: hasUrl && hasKey ? 'ok' : 'error', message: hasUrl && hasKey ? 'Đầy đủ' : 'Thiếu', icon: <Shield size={18} />, details: `URL: ${hasUrl ? '✓' : '✗'} | KEY: ${hasKey ? '✓' : '✗'}` });

        // 6. Server
        results.push({ name: 'Next.js Server', status: 'ok', message: 'v14 — Đang chạy', icon: <Globe size={18} />, details: 'Next.js 14 App Router | Port 3000' });

        setChecks(results);
        setLastCheck(new Date().toLocaleString('vi-VN'));
        setLoading(false);
    }

    useEffect(() => { runChecks(); }, []);

    const okCount = checks.filter(c => c.status === 'ok').length;
    const warnCount = checks.filter(c => c.status === 'warning').length;
    const errCount = checks.filter(c => c.status === 'error').length;
    const overallStatus = errCount > 0 ? 'error' : warnCount > 0 ? 'warning' : 'ok';

    const statusIcon = (s: string) => s === 'ok' ? <CheckCircle2 size={16} className="text-emerald-500" /> : s === 'warning' ? <AlertTriangle size={16} className="text-amber-500" /> : s === 'error' ? <XCircle size={16} className="text-red-500" /> : <Loader2 size={16} className="animate-spin text-gray-400" />;
    const statusBg = (s: string) => s === 'ok' ? 'border-emerald-200 bg-emerald-50/50' : s === 'warning' ? 'border-amber-200 bg-amber-50/50' : s === 'error' ? 'border-red-200 bg-red-50/50' : 'border-gray-200 bg-gray-50/50';
    const statusDot = (s: string) => s === 'ok' ? 'bg-emerald-500' : s === 'warning' ? 'bg-amber-500' : s === 'error' ? 'bg-red-500' : 'bg-gray-400';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Trạng thái hệ thống</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Kiểm tra kết nối, dữ liệu và dịch vụ</p>
                </div>
                <button onClick={runChecks} disabled={loading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 disabled:opacity-50 transition-all w-fit">
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    {loading ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
                </button>
            </div>

            {/* Overall Banner */}
            {!loading && (
                <div className={`rounded-2xl border p-5 flex items-center gap-4 animate-fade-in-up ${overallStatus === 'ok' ? 'bg-emerald-50 border-emerald-200' : overallStatus === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${overallStatus === 'ok' ? 'bg-emerald-100' : overallStatus === 'warning' ? 'bg-amber-100' : 'bg-red-100'}`}>
                        {overallStatus === 'ok' ? <CheckCircle2 size={28} className="text-emerald-600" /> : overallStatus === 'warning' ? <AlertTriangle size={28} className="text-amber-600" /> : <XCircle size={28} className="text-red-600" />}
                    </div>
                    <div>
                        <h2 className={`text-lg font-bold ${overallStatus === 'ok' ? 'text-emerald-800' : overallStatus === 'warning' ? 'text-amber-800' : 'text-red-800'}`}>
                            {overallStatus === 'ok' ? 'Hệ thống hoạt động bình thường' : overallStatus === 'warning' ? 'Có cảnh báo cần chú ý' : 'Phát hiện lỗi hệ thống'}
                        </h2>
                        <p className={`text-sm mt-0.5 ${overallStatus === 'ok' ? 'text-emerald-600' : overallStatus === 'warning' ? 'text-amber-600' : 'text-red-600'}`}>
                            {okCount} OK • {warnCount} cảnh báo • {errCount} lỗi{lastCheck && ` — ${lastCheck}`}
                        </p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                    { label: 'Bài viết', value: dbStats.posts, icon: <FileText size={14} className="text-blue-500" />, bg: 'bg-blue-50' },
                    { label: 'Đã xuất bản', value: dbStats.published, icon: <CheckCircle2 size={14} className="text-emerald-500" />, bg: 'bg-emerald-50' },
                    { label: 'Bản nháp', value: dbStats.drafts, icon: <AlertTriangle size={14} className="text-amber-500" />, bg: 'bg-amber-50' },
                    { label: 'Lên lịch', value: dbStats.scheduled, icon: <Clock size={14} className="text-purple-500" />, bg: 'bg-purple-50' },
                    { label: 'Chuyên mục', value: dbStats.categories, icon: <FolderOpen size={14} className="text-indigo-500" />, bg: 'bg-indigo-50' },
                    { label: 'Tags', value: dbStats.tags, icon: <Tags size={14} className="text-pink-500" />, bg: 'bg-pink-50' },
                    { label: 'Ảnh', value: dbStats.images, icon: <ImageIcon size={14} className="text-sky-500" />, bg: 'bg-sky-50' },
                    { label: 'Dung lượng', value: dbStats.storageUsed, icon: <HardDrive size={14} className="text-gray-500" />, bg: 'bg-gray-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm text-center animate-fade-in-up"
                        style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'forwards', opacity: 0 }}>
                        <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>{stat.icon}</div>
                        <p className="text-lg font-bold text-gray-900">{loading ? '—' : stat.value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Health Checks */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Activity size={16} className="text-gray-400" /> Kiểm tra dịch vụ</h2>
                    {!loading && <div className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${statusDot(overallStatus)} animate-pulse`} /><span className="text-xs text-gray-500">{overallStatus === 'ok' ? 'Tất cả OK' : 'Có vấn đề'}</span></div>}
                </div>
                {loading ? (
                    <div className="p-8 space-y-4">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50"><div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" /><div className="flex-1 space-y-2"><div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" /><div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" /></div></div>)}</div>
                ) : (
                    <div className="p-3 space-y-2">
                        {checks.map((check, idx) => (
                            <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm ${statusBg(check.status)}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${check.status === 'ok' ? 'bg-emerald-100 text-emerald-600' : check.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>{check.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5"><h3 className="text-sm font-semibold text-gray-900">{check.name}</h3>{statusIcon(check.status)}</div>
                                    <p className={`text-sm ${check.status === 'ok' ? 'text-emerald-700' : check.status === 'warning' ? 'text-amber-700' : 'text-red-700'}`}>{check.message}</p>
                                    {check.details && <p className="text-xs text-gray-400 mt-1.5 font-mono">{check.details}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ==================== BACKUP & RESTORE ==================== */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Database size={16} className="text-gray-400" /> Sao lưu &amp; Khôi phục</h2>
                </div>
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Export */}
                        <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><Download size={18} className="text-emerald-600" /></div>
                                <div><h3 className="text-sm font-semibold text-gray-900">Export Backup</h3><p className="text-xs text-gray-500">Tải toàn bộ dữ liệu (JSON)</p></div>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">Xuất tất cả bài viết, chuyên mục, tags, lịch nội dung &amp; cài đặt thành file JSON.</p>
                            <button onClick={handleExportBackup} disabled={exporting}
                                className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                                {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                {exporting ? 'Đang xuất...' : 'Tải Backup (.json)'}
                            </button>
                        </div>

                        {/* Import */}
                        <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><Upload size={18} className="text-blue-600" /></div>
                                <div><h3 className="text-sm font-semibold text-gray-900">Import / Restore</h3><p className="text-xs text-gray-500">Nhập dữ liệu từ file backup</p></div>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">Upload file JSON đã export trước đó. Dữ liệu trùng slug sẽ được cập nhật.</p>
                            <label className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                {importing ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                {importing ? 'Đang nhập...' : 'Chọn file Backup (.json)'}
                                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" disabled={importing} />
                            </label>
                        </div>
                    </div>

                    {importResult && (
                        <div className="bg-gray-900 rounded-xl p-4 text-xs text-gray-300 font-mono whitespace-pre-line animate-fade-in-up">
                            <p className="text-gray-500 mb-2">Kết quả import:</p>
                            {importResult}
                        </div>
                    )}
                </div>
            </div>

            {/* System Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-900">Thông tin hệ thống</h2></div>
                <div className="divide-y divide-gray-100">
                    {[
                        { label: 'CMS', value: '10x Solution CMS v1.0' },
                        { label: 'Framework', value: 'Next.js 14 (App Router)' },
                        { label: 'Database', value: 'Supabase (PostgreSQL)' },
                        { label: 'Storage', value: 'Supabase Storage' },
                        { label: 'Editor', value: 'Tiptap (ProseMirror)' },
                        { label: 'Styling', value: 'Tailwind CSS' },
                        { label: 'Icons', value: 'Lucide React' },
                        { label: 'Supabase URL', value: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || 'Chưa cấu hình' },
                    ].map((info, idx) => (
                        <div key={idx} className="flex items-center justify-between px-5 py-3">
                            <span className="text-sm text-gray-500">{info.label}</span>
                            <span className="text-sm font-medium text-gray-900">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4">
                <p className="text-xs text-gray-300">Powered by <span className="font-semibold text-gray-400">10x Solution</span> &copy; {new Date().getFullYear()}</p>
            </div>
        </div>
    );
}
