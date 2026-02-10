'use client';
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
    const router = useRouter();
    const [basePath, setBasePath] = useState<string>('/admin');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr) as { role?: string };
                setBasePath(user?.role === 'participant' ? '/participant' : '/admin');
            } catch {
                setBasePath('/admin');
            }
        }
    }, []);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
    }

    return (
        <div className="m-8 p-2 border-b-2 flex justify-between">
            <div>
                <Link href={`${basePath}/dashboard`} className="hover:border-b rounded-b-lg p-2">Dashboard</Link>
                <Link href={`${basePath}/events`} className="ml-4 hover:border-b rounded-b-lg p-2">Events</Link>
                <Link href={basePath === '/participant' ? '/participant/reservation/me' : `${basePath}/reservation`} className="ml-4 hover:border-b rounded-b-lg p-2">Booking</Link>
            </div>
            <div>
                <Button type="button" onClick={logout} className="bg-red-500 text-white hover:bg-red-600">Logout</Button>
            </div>
        </div>
    );
}