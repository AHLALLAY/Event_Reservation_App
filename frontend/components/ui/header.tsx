'use client';
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const router = useRouter();
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
    }
    return (
        <div className="m-8 p-2 border-b-2 flex justify-between">
            <div>
                <Link href="/admin/dashboard" className="hover:border-b-1 rounded-b-lg p-2">Dashboard</Link>
                <Link href="/admin/events" className="ml-4 hover:border-b-1 rounded-b-lg p-2">Events</Link>
                <Link href="/admin/reservation" className="ml-4 hover:border-b-1 rounded-b-lg p-2">Booking</Link>
            </div>
            <div>
                <Button type="button" onClick={logout} className="bg-red-500 text-white hover:bg-red-600">Logout</Button>
            </div>
        </div>
    );
}