"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthUser {
    userId: string | null;
    email: string;
    name: string;
    role: 'super_admin' | 'admin' | 'editor';
    tenantId: string | null;
    tenantName: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isSuperAdmin: boolean;
    tenantId: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null, loading: true, isSuperAdmin: false, tenantId: null
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                setUser(data.user || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isSuperAdmin: user?.role === 'super_admin',
            tenantId: user?.tenantId || null,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
