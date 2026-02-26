-- Migration 005: Create user function with password hashing
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION create_user(
    p_email TEXT,
    p_password TEXT,
    p_name TEXT,
    p_role TEXT DEFAULT 'editor',
    p_tenant_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    INSERT INTO users (email, password_hash, name, role, tenant_id)
    VALUES (p_email, crypt(p_password, gen_salt('bf')), p_name, p_role, p_tenant_id)
    RETURNING id INTO new_id;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
