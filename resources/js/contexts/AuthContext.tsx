import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await api.get("/me");
                setUser(response.data.user);
            }
        } catch (error) {
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await api.post("/login", { email, password });
        const { token } = response.data.authorization;
        localStorage.setItem("token", token);
        setUser(response.data.user);
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => {
        const response = await api.post("/register", {
            name,
            email,
            password,
            password_confirmation,
        });
        const { token } = response.data.authorization;
        localStorage.setItem("token", token);
        setUser(response.data.user);
    };

    const logout = async () => {
        await api.post("/logout");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
