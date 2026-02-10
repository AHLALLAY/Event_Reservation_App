'use client';

import NavBar from "@/components/ui/header";
import { useEffect, useState } from "react";

type ReservationItem = {
    id?: string;
    status?: string;
    createdAt?: string;
    event?: { id?: string; title?: string; place?: string; startDate?: string; endDate?: string };
};

const statusLabel: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    refused: 'Refused',
    canceled: 'Canceled',
};

export default function ParticipantReservationPage() {
    const [reservations, setReservations] = useState<ReservationItem[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const getMyReservations = async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            setReservations([]);
            return;
        }
        setFetchError(null);
        try {
            const res = await fetch('http://localhost:3001/reservations/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setReservations(Array.isArray(data) ? data : []);
        } catch (err) {
            setFetchError('Cannot reach the API.');
            setReservations([]);
        }
    };

    useEffect(() => {
        getMyReservations();
    }, []);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '—';
        try {
            return new Date(dateStr).toLocaleString();
        } catch {
            return dateStr;
        }
    };

    return (
        <>
            <NavBar />
            {fetchError && <p className="p-2 text-amber-600 text-sm">{fetchError}</p>}
            <div className="p-2">
                <h1 className="text-xl font-semibold mb-2">Your reservations</h1>
                {reservations.length === 0 && !fetchError ? (
                    <p className="text-gray-500">You have no reservations yet.</p>
                ) : (
                    <table className="w-full divide-y">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Event</th>
                                <th className="text-left p-2">Place</th>
                                <th className="text-left p-2">Start</th>
                                <th className="text-left p-2">End</th>
                                <th className="text-left p-2">Status</th>
                                <th className="text-left p-2">Booked at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((item, index) => (
                                <tr key={item.id ?? index} className="border-b">
                                    <td className="p-2">{item.event?.title ?? '—'}</td>
                                    <td className="p-2">{item.event?.place ?? '—'}</td>
                                    <td className="p-2 whitespace-nowrap">{formatDate(item.event?.startDate)}</td>
                                    <td className="p-2 whitespace-nowrap">{formatDate(item.event?.endDate)}</td>
                                    <td className="p-2">{statusLabel[item.status ?? ''] ?? item.status}</td>
                                    <td className="p-2 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
