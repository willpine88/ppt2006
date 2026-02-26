// ==================== POST ====================
export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    featured_image_alt: string | null;
    category_id: string | null;
    tags: string[];
    author: string | null;
    meta_title: string | null;
    meta_description: string | null;
    is_published: boolean;
    published_at: string | null;
    scheduled_at: string | null;
    created_at: string;
    updated_at: string;
}

// ==================== CATEGORY ====================
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
}

// ==================== TAG ====================
export interface Tag {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
}

// ==================== MEDIA ====================
export interface MediaFile {
    name: string;
    url: string;
    size: number;
    created_at: string;
    type: string;
}

// ==================== SCHEDULED CONTENT ====================
export interface ScheduledContent {
    id: string;
    title: string;
    type: 'article' | 'update' | 'promotion' | 'review';
    status: 'draft' | 'scheduled' | 'published' | 'overdue';
    scheduled_date: string;
    author: string;
    category: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

// ==================== PAGE CONTENT ====================
export interface PageContent {
    id: string;
    section_id: string;
    page_path: string;
    data: Record<string, string>;
    updated_at: string;
}

// ==================== SITE SETTINGS ====================
export interface SiteSettings {
    id: string;
    key: string;
    value: any;
}

// ==================== STATS ====================
export interface DashboardStats {
    posts: number;
    categories: number;
    published: number;
    drafts: number;
    scheduled: number;
    imagesCount: number;
    thisMonthPosts: number;
    lastMonthPosts: number;
}
