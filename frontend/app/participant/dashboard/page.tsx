'use client';

import NavBar from "@/components/ui/header";
import { StatsCard } from "@/components/ui/statusCard";
import { useEffect, useState } from "react";

type EventItem = { id?: string; title?: string; status?: string };
type ReservationItem = { id?: string; status?: string; event?: { title?: string }; createdAt?: string };

export default function ParticipantDashboard() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [myReservations, setMyReservations] = useState<ReservationItem[]>([]);
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

    const getMyReservations = async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            setMyReservations([]);
            return;
        }
        try {
            const res = await fetch('http://localhost:3001/reservations/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setMyReservations(Array.isArray(data) ? data : []);
        } catch {
            setMyReservations([]);
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
            if (res.ok) {
                getEvents();
                getMyReservations();
            } else {
                const data = await res.json().catch(() => ({}));
                setFetchError(data.message || 'Booking failed.');
            }
        } catch (err) {
            setFetchError(err instanceof Error ? err.message : 'Cannot reach the API.');
        }
    };

    useEffect(() => {
        getEvents();
        getMyReservations();
    }, []);

    const eventsByStatus = {
        available: events.length,
    };

    const reservationsByStatus = {
        pending: myReservations.filter((r) => r.status === 'pending').length,
        confirmed: myReservations.filter((r) => r.status === 'confirmed').length,
        refused: myReservations.filter((r) => r.status === 'refused').length,
        canceled: myReservations.filter((r) => r.status === 'canceled').length,
    };

    return (
        <>
            <NavBar />
            {fetchError && <p className="p-2 text-amber-600 text-sm">{fetchError}</p>}
            <div className="flex p-2">
                <StatsCard
                    title="Available events"
                    items={[
                        { label: "Published", value: eventsByStatus.available },
                    ]}
                />
                <StatsCard
                    title="My reservations"
                    items={[
                        { label: "Pending", value: reservationsByStatus.pending },
                        { label: "Confirmed", value: reservationsByStatus.confirmed },
                        { label: "Refused", value: reservationsByStatus.refused },
                        { label: "Canceled", value: reservationsByStatus.canceled },
                    ]}
                />
            </div>
        </>
    );
}
