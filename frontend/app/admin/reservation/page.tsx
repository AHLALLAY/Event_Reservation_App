'use client';

import NavBar from "@/components/ui/header";
import { useEffect, useState } from "react";
type ReservationRow = {
    id?: string;
    status?: string;
    createdAt?: string;
    event?: { id?: string; title?: string };
    user?: { id?: string; fullName?: string; email?: string };
};

const statusLabel: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    refused: 'Refused',
    canceled: 'Canceled',
};

export default function AdminReservationPage() {
    const [data, setData] = useState<ReservationRow[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const getData = async () => {
        setFetchError(null);
        try {
            const res = await fetch('http://localhost:3001/reservations');
            const json = await res.json();
            setData(Array.isArray(json) ? json : []);
        } catch (err) {
            setFetchError('Cannot reach the API.');
            setData([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <NavBar />
            {fetchError && <p className="p-2 text-amber-600 text-sm">{fetchError}</p>}
            <div className="p-2">
                <h1 className="text-xl font-semibold mb-2">Reservations</h1>
                <table className="w-full divide-y">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Participant</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id ?? index}>
                                <td>{item.event?.title ?? '—'}</td>
                                <td>{item.user?.fullName ?? '—'}</td>
                                <td>{item.user?.email ?? '—'}</td>
                                <td>{statusLabel[item.status ?? ''] ?? item.status}</td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
