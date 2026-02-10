'use client';

import NavBar from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type EventItem = {
    id?: string;
    title?: string;
    description?: string;
    place?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    capacity?: number;
};

export default function EventsListClient({ initialEvents }: { initialEvents: EventItem[] }) {
    const router = useRouter();
    const [fetchError, setFetchError] = useState<string | null>(null);

    const addReservation = async (eventId: string) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        try {
            const res = await fetch('http://localhost:3001/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ eventId }),
            });
            if (res.ok) router.refresh();
            else {
                const data = await res.json().catch(() => ({}));
                setFetchError(data.message || 'Booking failed.');
            }
        } catch (err) {
            setFetchError(err instanceof Error ? err.message : 'Cannot reach the API.');
        }
    };

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
            <main className="mx-auto max-w-6xl px-4 py-6">
                {fetchError && <p className="mb-4 text-amber-600 text-sm">{fetchError}</p>}
                <div className="overflow-x-auto rounded border">
                    <table className="w-full min-w-[640px] divide-y">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Title</th>
                                <th className="text-left p-2">Description</th>
                                <th className="text-left p-2">Place</th>
                                <th className="text-left p-2">Start</th>
                                <th className="text-left p-2">End</th>
                                <th className="text-left p-2">Capacity</th>
                                <th className="text-left p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialEvents.map((event, index) => (
                                <tr key={event.id ?? index} className="border-b">
                                    <td className="p-2">
                                        {event.id ? (
                                            <Link href={`/participant/events/${event.id}/details`} className="underline hover:no-underline">{event.title}</Link>
                                        ) : (
                                            event.title
                                        )}
                                    </td>
                                    <td className="p-2 max-w-xs truncate" title={event.description}>{event.description ?? '—'}</td>
                                    <td className="p-2">{event.place ?? '—'}</td>
                                    <td className="p-2 whitespace-nowrap">{formatDate(event.startDate)}</td>
                                    <td className="p-2 whitespace-nowrap">{formatDate(event.endDate)}</td>
                                    <td className="p-2">{event.capacity ?? '—'}</td>
                                    <td className="p-2">
                                        <Button
                                            type="button"
                                            disabled={!event.id}
                                            onClick={() => event.id && addReservation(event.id)}
                                        >
                                            Book event
                                        </Button>
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
