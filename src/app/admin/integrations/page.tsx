"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    BarChart3, Search, Globe, CheckCircle2, XCircle,
    Save, Loader2, Check, ExternalLink, Copy, Info,
    AlertTriangle, Code2,
} from "lucide-react";

interface IntegrationSettings {
    ga4_measurement_id: string;
    gsc_verification_code: string;
    gsc_property_url: string;
    ga4_enabled: boolean;
    gsc_enabled: boolean;
}

export default function IntegrationsPage() {
    const [settings, setSettings] = useState<IntegrationSettings>({
        ga4_measurement_id: '',
        gsc_verification_code: '',
        gsc_property_url: '',
        ga4_enabled: false,
        gsc_enabled: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showSnippet, setShowSnippet] = useState<'ga4' | 'gsc' | null>(null);
    const [copiedSnippet, setCopiedSnippet] = useState(false);

    useEffect(() => {
        async function loadSettings() {
            setLoading(true);
            const { data } = await supabase
                .from('site_settings')
                .select('*')
                .eq('key', 'integrations')
                .single();

            if (data?.value) {
                try {
                    const parsed = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
                    setSettings(prev => ({ ...prev, ...parsed }));
                } catch { /* ignore parse errors */ }
            }
            setLoading(false);
        }
        loadSettings();
    }, []);

    async function handleSave() {
        setSaving(true);
        // Upsert to site_settings
        const { error } = await supabase
            .from('site_settings')
            .upsert({
                key: 'integrations',
                value: settings,
                updated_at: new Date().toISOString(),
            }, { onConflict: 'key' });

        if (!error) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } else {
            alert('Lỗi lưu cài đặt: ' + error.message);
        }
        setSaving(false);
    }

    function copySnippet(text: string) {
        navigator.clipboard.writeText(text);
        setCopiedSnippet(true);
        setTimeout(() => setCopiedSnippet(false), 2000);
    }

    const ga4Snippet = `<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${settings.ga4_measurement_id || 'G-XXXXXXXXXX'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${settings.ga4_measurement_id || 'G-XXXXXXXXXX'}');
</script>`;

    const gscMetaTag = `<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="${settings.gsc_verification_code || 'YOUR_VERIFICATION_CODE'}" />`;

    const nextjsGA4Component = `// components/GoogleAnalytics.tsx
import Script from 'next/script';

export default function GoogleAnalytics() {
  const GA_ID = '${settings.ga4_measurement_id || 'G-XXXXXXXXXX'}';
  return (
    <>
      <Script src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_ID}\`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '\${GA_ID}');
        \`}
      </Script>
    </>
  );
}

// Thêm vào layout.tsx:
// import GoogleAnalytics from '@/components/GoogleAnalytics';
// <GoogleAnalytics />`;

    const isGA4Valid = /^G-[A-Z0-9]+$/.test(settings.ga4_measurement_id);
    const isGSCValid = settings.gsc_verification_code.length > 10;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tích hợp</h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                        Kết nối Google Analytics & Search Console
                    </p>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 disabled:opacity-50 transition-all w-fit">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                    {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu cài đặt'}
                </button>
            </div>

            {/* Connection Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-2xl border p-5 ${settings.ga4_enabled && isGA4Valid ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.ga4_enabled && isGA4Valid ? 'bg-emerald-100' : 'bg-gray-200'}`}>
                                <BarChart3 size={20} className={settings.ga4_enabled && isGA4Valid ? 'text-emerald-600' : 'text-gray-400'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Google Analytics 4</h3>
                                <p className="text-xs text-gray-500">Theo dõi lượng truy cập</p>
                            </div>
                        </div>
                        {settings.ga4_enabled && isGA4Valid
                            ? <CheckCircle2 size={20} className="text-emerald-500" />
                            : <XCircle size={20} className="text-gray-300" />
                        }
                    </div>
                    <p className={`text-xs font-medium ${settings.ga4_enabled && isGA4Valid ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {settings.ga4_enabled && isGA4Valid ? `Đã kết nối: ${settings.ga4_measurement_id}` : 'Chưa kết nối'}
                    </p>
                </div>

                <div className={`rounded-2xl border p-5 ${settings.gsc_enabled && isGSCValid ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.gsc_enabled && isGSCValid ? 'bg-emerald-100' : 'bg-gray-200'}`}>
                                <Search size={20} className={settings.gsc_enabled && isGSCValid ? 'text-emerald-600' : 'text-gray-400'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Google Search Console</h3>
                                <p className="text-xs text-gray-500">Theo dõi hiệu suất tìm kiếm</p>
                            </div>
                        </div>
                        {settings.gsc_enabled && isGSCValid
                            ? <CheckCircle2 size={20} className="text-emerald-500" />
                            : <XCircle size={20} className="text-gray-300" />
                        }
                    </div>
                    <p className={`text-xs font-medium ${settings.gsc_enabled && isGSCValid ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {settings.gsc_enabled && isGSCValid ? 'Đã xác minh' : 'Chưa kết nối'}
                    </p>
                </div>
            </div>

            {/* ==================== GOOGLE ANALYTICS 4 ==================== */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                            <BarChart3 size={16} className="text-orange-500" />
                        </div>
                        <h2 className="font-semibold text-gray-900">Google Analytics 4 (GA4)</h2>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.ga4_enabled}
                            onChange={(e) => setSettings({ ...settings, ga4_enabled: e.target.checked })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                </div>
                <div className="p-6 space-y-5">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-700 space-y-1">
                            <p><strong>Cách lấy Measurement ID:</strong></p>
                            <ol className="list-decimal ml-4 space-y-0.5">
                                <li>Vào <a href="https://analytics.google.com" target="_blank" rel="noopener" className="underline font-medium">Google Analytics</a></li>
                                <li>Admin → Data Streams → Chọn web stream</li>
                                <li>Copy <strong>Measurement ID</strong> (bắt đầu bằng <code className="bg-blue-100 px-1 rounded">G-</code>)</li>
                            </ol>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Measurement ID (GA4)</label>
                        <div className="relative">
                            <input type="text" value={settings.ga4_measurement_id}
                                onChange={(e) => setSettings({ ...settings, ga4_measurement_id: e.target.value.toUpperCase() })}
                                placeholder="G-XXXXXXXXXX"
                                className={`w-full px-4 py-3 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 transition-all ${settings.ga4_measurement_id && !isGA4Valid
                                        ? 'border-red-300 focus:ring-red-500/20'
                                        : isGA4Valid
                                            ? 'border-emerald-300 focus:ring-emerald-500/20'
                                            : 'border-gray-200 focus:ring-gray-900/10'
                                    }`}
                            />
                            {isGA4Valid && (
                                <CheckCircle2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                            )}
                        </div>
                        {settings.ga4_measurement_id && !isGA4Valid && (
                            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                <AlertTriangle size={12} /> Measurement ID phải có dạng G-XXXXXXXXXX
                            </p>
                        )}
                    </div>

                    {/* Code Snippet */}
                    <div>
                        <button onClick={() => setShowSnippet(showSnippet === 'ga4' ? null : 'ga4')}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            <Code2 size={14} />
                            {showSnippet === 'ga4' ? 'Ẩn code' : 'Xem code tích hợp'}
                        </button>
                        {showSnippet === 'ga4' && (
                            <div className="mt-3 space-y-4 animate-fade-in-up">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-500">HTML (thêm vào &lt;head&gt;)</span>
                                        <button onClick={() => copySnippet(ga4Snippet)}
                                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                            {copiedSnippet ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                            {copiedSnippet ? 'Đã copy!' : 'Copy'}
                                        </button>
                                    </div>
                                    <pre className="bg-gray-900 text-gray-300 p-4 rounded-xl overflow-x-auto text-xs leading-relaxed">
                                        <code>{ga4Snippet}</code>
                                    </pre>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-500">Next.js Component</span>
                                        <button onClick={() => copySnippet(nextjsGA4Component)}
                                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                            <Copy size={12} /> Copy
                                        </button>
                                    </div>
                                    <pre className="bg-gray-900 text-gray-300 p-4 rounded-xl overflow-x-auto text-xs leading-relaxed max-h-[300px] overflow-y-auto">
                                        <code>{nextjsGA4Component}</code>
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>

                    {settings.ga4_enabled && isGA4Valid && (
                        <div className="flex items-center gap-3 pt-2">
                            <a href={`https://analytics.google.com`} target="_blank" rel="noopener"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
                                <BarChart3 size={14} /> Mở Google Analytics
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* ==================== GOOGLE SEARCH CONSOLE ==================== */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Search size={16} className="text-blue-500" />
                        </div>
                        <h2 className="font-semibold text-gray-900">Google Search Console</h2>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.gsc_enabled}
                            onChange={(e) => setSettings({ ...settings, gsc_enabled: e.target.checked })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                </div>
                <div className="p-6 space-y-5">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-700 space-y-1">
                            <p><strong>Cách xác minh Search Console:</strong></p>
                            <ol className="list-decimal ml-4 space-y-0.5">
                                <li>Vào <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="underline font-medium">Google Search Console</a></li>
                                <li>Thêm property → Chọn phương thức <strong>HTML Tag</strong></li>
                                <li>Copy chuỗi <code className="bg-blue-100 px-1 rounded">content=&quot;...&quot;</code> trong meta tag</li>
                                <li>Dán vào ô bên dưới rồi bấm <strong>Xác minh</strong> trên Google</li>
                            </ol>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mã xác minh (Verification Code)</label>
                        <input type="text" value={settings.gsc_verification_code}
                            onChange={(e) => setSettings({ ...settings, gsc_verification_code: e.target.value.trim() })}
                            placeholder="Dán mã xác minh từ Search Console..."
                            className={`w-full px-4 py-3 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 transition-all ${isGSCValid ? 'border-emerald-300 focus:ring-emerald-500/20' : 'border-gray-200 focus:ring-gray-900/10'
                                }`}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Property URL</label>
                        <input type="url" value={settings.gsc_property_url}
                            onChange={(e) => setSettings({ ...settings, gsc_property_url: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all"
                        />
                        <p className="text-xs text-gray-400 mt-1">URL property đã đăng ký trên Search Console</p>
                    </div>

                    {/* Meta Tag Snippet */}
                    <div>
                        <button onClick={() => setShowSnippet(showSnippet === 'gsc' ? null : 'gsc')}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            <Code2 size={14} />
                            {showSnippet === 'gsc' ? 'Ẩn code' : 'Xem meta tag xác minh'}
                        </button>
                        {showSnippet === 'gsc' && (
                            <div className="mt-3 animate-fade-in-up">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-500">Meta tag (thêm vào &lt;head&gt;)</span>
                                    <button onClick={() => copySnippet(gscMetaTag)}
                                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                        {copiedSnippet ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                        {copiedSnippet ? 'Đã copy!' : 'Copy'}
                                    </button>
                                </div>
                                <pre className="bg-gray-900 text-gray-300 p-4 rounded-xl overflow-x-auto text-xs leading-relaxed">
                                    <code>{gscMetaTag}</code>
                                </pre>
                            </div>
                        )}
                    </div>

                    {settings.gsc_enabled && (
                        <div className="flex items-center gap-3 pt-2">
                            <a href={settings.gsc_property_url
                                ? `https://search.google.com/search-console?resource_id=${encodeURIComponent(settings.gsc_property_url)}`
                                : 'https://search.google.com/search-console'}
                                target="_blank" rel="noopener"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                <Search size={14} /> Mở Search Console
                                <ExternalLink size={12} />
                            </a>
                            <a href={settings.gsc_property_url
                                ? `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(settings.gsc_property_url)}`
                                : '#'}
                                target="_blank" rel="noopener"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                <Globe size={14} /> Submit Sitemap
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Liên kết nhanh</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                        { label: 'Google Analytics', url: 'https://analytics.google.com', icon: <BarChart3 size={14} />, color: 'text-orange-600 bg-orange-50 border-orange-200' },
                        { label: 'Search Console', url: 'https://search.google.com/search-console', icon: <Search size={14} />, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                        { label: 'PageSpeed Insights', url: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(settings.gsc_property_url || '')}`, icon: <Globe size={14} />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                        { label: 'Rich Results Test', url: 'https://search.google.com/test/rich-results', icon: <CheckCircle2 size={14} />, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                    ].map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noopener"
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium hover:shadow-sm transition-all ${link.color}`}>
                            {link.icon}
                            {link.label}
                            <ExternalLink size={10} className="ml-auto" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
