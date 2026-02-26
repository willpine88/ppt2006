-- Migration 003: Multi-tenant support
-- Run this in Supabase SQL Editor

-- 1. Bảng Tenants (mỗi site/tổ chức)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT,
    logo TEXT,
    plan TEXT DEFAULT 'free',
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng Users (đăng nhập, gắn với tenant)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Thêm tenant_id vào bảng posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

-- 4. Thêm tenant_id vào bảng categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

-- 5. Thêm tenant_id vào bảng tags
ALTER TABLE tags ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

-- 6. Index để query nhanh
CREATE INDEX IF NOT EXISTS idx_posts_tenant ON posts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_categories_tenant ON categories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tags_tenant ON tags(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);

-- 7. RLS policies
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenants_public_read" ON tenants FOR SELECT USING (true);
CREATE POLICY "tenants_all" ON tenants FOR ALL USING (true);
CREATE POLICY "users_public_read" ON users FOR SELECT USING (true);
CREATE POLICY "users_all" ON users FOR ALL USING (true);

-- 8. Extension cho hash password
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 9. Tạo tenant mặc định + super admin
INSERT INTO tenants (name, slug, plan) 
VALUES ('10x Solution', '10x-solution', 'pro')
ON CONFLICT (slug) DO NOTHING;

-- 10. Tạo super admin (password: 10xAdmin@2026)
INSERT INTO users (email, password_hash, name, role, tenant_id)
SELECT 
    'admin@10xsolution.com',
    crypt('10xAdmin@2026', gen_salt('bf')),
    'Admin',
    'super_admin',
    t.id
FROM tenants t WHERE t.slug = '10x-solution'
ON CONFLICT (email) DO NOTHING;

-- 11. Gắn data cũ vào tenant mặc định
UPDATE posts SET tenant_id = (SELECT id FROM tenants WHERE slug = '10x-solution') WHERE tenant_id IS NULL;
UPDATE categories SET tenant_id = (SELECT id FROM tenants WHERE slug = '10x-solution') WHERE tenant_id IS NULL;
UPDATE tags SET tenant_id = (SELECT id FROM tenants WHERE slug = '10x-solution') WHERE tenant_id IS NULL;
