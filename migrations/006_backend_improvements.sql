-- Migration 006: Update password + Rate limit + Activity log
-- Run this in Supabase SQL Editor

-- 1. Update password function
CREATE OR REPLACE FUNCTION update_password(p_user_id UUID, p_new_password TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE users SET password_hash = crypt(p_new_password, gen_salt('bf')),
                     updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Login attempts table (rate limit)
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    ip_address TEXT,
    success BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email, created_at);

-- 3. Activity log table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    details JSONB DEFAULT '{}',
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_tenant ON activity_logs(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);

-- RLS
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "login_attempts_all" ON login_attempts FOR ALL USING (true);
CREATE POLICY "activity_logs_all" ON activity_logs FOR ALL USING (true);
