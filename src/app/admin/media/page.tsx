"use client";

import { useEffect, useState, useRef } from "react";
import { uploadImage, listStorageImages, deleteStorageImage } from "@/lib/supabase";
import { MediaFile } from "@/lib/types";
import { Upload, Trash2, Loader2, Search, Image as ImageIcon, Copy, Check, ExternalLink } from "lucide-react";

export default function MediaPage() {
    const [images, setImages] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { loadImages(); }, []);

    async function loadImages() {
        setLoading(true);
        const data = await listStorageImages('post-images');
        setImages(data);
        setLoading(false);
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files; if (!files) return;
        setUploading(true);
        for (const file of Array.from(files)) {
            if (file.size > 5 * 1024 * 1024) { alert(`${file.name} quá lớn (max 5MB)`); continue; }
            await uploadImage(file, 'post-images');
        }
        await loadImages(); setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    async function handleDelete(name: string) {
        if (!confirm('Xóa ảnh?')) return;
        await deleteStorageImage(name, 'post-images');
        setImages(images.filter(i => i.name !== name));
    }

    function copyUrl(url: string) {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    }

    function formatSize(bytes: number) {
        if (bytes === 0) return '0 B';
        const k = 1024; const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    const filtered = images.filter(img => img.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div><h1 className="text-2xl font-bold text-gray-900">Thư viện ảnh</h1><p className="text-gray-500 text-sm mt-0.5">{images.length} ảnh</p></div>
                <div className="flex items-center gap-2">
                    <input type="file" ref={fileInputRef} accept="image/*" multiple onChange={handleUpload} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 disabled:opacity-50">
                        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} {uploading ? 'Đang tải...' : 'Upload ảnh'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Tìm ảnh..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gray-300 focus:bg-white" />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />)}
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">{searchTerm ? "Không tìm thấy ảnh" : "Chưa có ảnh nào"}</p>
                    <button onClick={() => fileInputRef.current?.click()} className="text-sm text-gray-900 font-medium hover:text-emerald-600">Upload ảnh đầu tiên</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filtered.map(img => (
                        <div key={img.name} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:border-gray-200 transition-all">
                            <div className="aspect-square relative overflow-hidden bg-gray-50">
                                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    <button onClick={() => copyUrl(img.url)} className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100">
                                        {copiedUrl === img.url ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                    </button>
                                    <a href={img.url} target="_blank" rel="noopener" className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"><ExternalLink size={14} /></a>
                                    <button onClick={() => handleDelete(img.name)} className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs text-gray-700 truncate font-medium">{img.name}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{formatSize(img.size)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
