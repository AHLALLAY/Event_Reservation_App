'use client';

import NavBar from "@/components/ui/header";
import { Button } from "@/components/ui/button";
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

    const confirmReservation = async (id: string) => {
        if (!id) return;
        try {
            const res = await fetch(`http://localhost:3001/reservations/${id}/confirm`, { method: 'PATCH' });
            if (res.ok) getData();
            else {
                const err = await res.json();
                setFetchError(err.message);
            }
        } catch {
            setFetchError('Cannot reach the API.');
        }
    };

    const refuseReservation = async (id: string) => {
        if (!id) return;
        try {
            const res = await fetch(`http://localhost:3001/reservations/${id}/refuse`, { method: 'PATCH' });
            if (res.ok) getData();
            else {
                const err = await res.json();
                setFetchError(err.message);
            }
        } catch {
            setFetchError('Cannot reach the API.');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <NavBar />
            <main className="mx-auto max-w-6xl px-4 py-6">
                {fetchError && <p className="mb-4 text-amber-600 text-sm">{fetchError}</p>}
                <h1 className="mb-4 text-xl font-semibold">Reservations</h1>
                <div className="overflow-x-auto rounded border">
                <table className="w-full min-w-[640px] divide-y">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Participant</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
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
                                <td className="flex flex-wrap gap-2">
                                    {item.status === 'pending' && (
                                        <>
                                            <Button type="button" onClick={() => item.id && confirmReservation(item.id)}>Accept</Button>
                                            <Button type="button" onClick={() => item.id && refuseReservation(item.id)} className="bg-red-500 hover:bg-red-600 text-white">Refuse</Button>
                                        </>
                                    )}
                                    {item.status !== 'pending' && '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </main>
        </>
    );
}
