'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children, }: { children: React.ReactNode; }) {
    const router = useRouter();
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        let role: string | null = null;

        if (userStr) {
            try {
                const user = JSON.parse(userStr) as { role?: string };
                role = user?.role ?? null;
            } catch {
                role = null;
            }
        }

        if (!token || role !== 'admin') {
            router.replace('/auth/login');
            return;
        }
        setAllowed(true);
    }, [router]);

    if (allowed === null) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if(!allowed) return null;
    return <>{children}</>
}