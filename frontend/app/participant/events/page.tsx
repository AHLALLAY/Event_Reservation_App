'use client';

import NavBar from "@/components/ui/header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type EventItem = {
    id?: string;
    title?: string;
    description?: string;
    place?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    capacity?: number;
};

export default function ParticipantEventsPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const getEvents = async () => {
        setFetchError(null);
        try {
            const res = await fetch('http://localhost:3001/events');
            const data = await res.json();
            const list = Array.isArray(data) ? data : [];
            setEvents(list.filter((e: EventItem) => e.status === 'published')); 
        } catch (err) {
            setFetchError('Cannot reach the API.');
            setEvents([]);
        }
    };

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
            if (res.ok) getEvents();
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

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <NavBar />
            {fetchError && <p className="p-2 text-amber-600 text-sm">{fetchError}</p>}
            <div className="p-2 overflow-x-auto">
                <table className="w-full divide-y">
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
                        {events.map((event, index) => (
                            <tr key={event.id ?? index} className="border-b">
                                <td className="p-2">{event.title}</td>
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
        </>
    );
}
