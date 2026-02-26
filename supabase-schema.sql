-- =============================================
-- 10x Solution CMS — Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. POSTS
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT DEFAULT '',
    content TEXT DEFAULT '',
    featured_image TEXT,
    featured_image_alt TEXT,
    category_id TEXT,
    tags TEXT[] DEFAULT '{}',
    author TEXT,
    meta_title TEXT,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TAGS
CREATE TABLE IF NOT EXISTS tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. SCHEDULED CONTENT (Content Calendar)
CREATE TABLE IF NOT EXISTS scheduled_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT DEFAULT 'article',
    status TEXT DEFAULT 'scheduled',
    scheduled_date DATE,
    author TEXT,
    category TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PAGE CONTENT (CMS dynamic sections)
CREATE TABLE IF NOT EXISTS page_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_id TEXT UNIQUE NOT NULL,
    page_path TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. SITE SETTINGS (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled ON posts(scheduled_at) WHERE scheduled_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_scheduled_content_date ON scheduled_content(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- =============================================
-- ROW LEVEL SECURITY (allow all for now, lock down later)
-- =============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (adjust for production)
CREATE POLICY "Allow all on posts" ON posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on tags" ON tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on scheduled_content" ON scheduled_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on page_content" ON page_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- STORAGE BUCKET
-- =============================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-images', 'post-images', true) 
ON CONFLICT (id) DO NOTHING;

-- Storage policy: allow public uploads/reads
CREATE POLICY "Allow public upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'post-images');

CREATE POLICY "Allow public read" ON storage.objects 
FOR SELECT USING (bucket_id = 'post-images');

CREATE POLICY "Allow public delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'post-images');

-- =============================================
-- SEED DATA (optional sample categories)
-- =============================================
INSERT INTO categories (name, slug, description) VALUES
    ('Tin tức', 'tin-tuc', 'Tin tức mới nhất'),
    ('Hướng dẫn', 'huong-dan', 'Bài viết hướng dẫn chi tiết'),
    ('Review', 'review', 'Đánh giá và nhận xét'),
    ('Kiến thức', 'kien-thuc', 'Kiến thức chuyên ngành')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug) VALUES
    ('SEO', 'seo'),
    ('Marketing', 'marketing'),
    ('Digital', 'digital'),
    ('Hướng dẫn', 'huong-dan'),
    ('Tips', 'tips')
ON CONFLICT (slug) DO NOTHING;

-- Done! Refresh Supabase Dashboard to see tables.
