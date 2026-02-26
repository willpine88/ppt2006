-- Migration 004: Password verification function
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION check_password(p_hash TEXT, p_password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN p_hash = crypt(p_password, p_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
