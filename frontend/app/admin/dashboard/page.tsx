'use client';

import { StatsCard } from "@/components/ui/statusCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
    }

    return (
        <>
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
            <div className="flex p-2">
                <StatsCard
                    title="Événements par statut"
                    items={[
                        { label: "Publiés", value: 0 },
                        { label: "Annulés", value: 0 },
                        { label: "Brouillon", value: 0 },
                    ]}
                />
                <StatsCard
                    title="Réservations par statut"
                    items={[
                        { label: "En attente", value: 0 },
                        { label: "Confirmées", value: 0 },
                        { label: "Refusées", value: 0 },
                        { label: "Annulées", value: 0 },
                    ]}
                />
            </div>
        </>
    );
}