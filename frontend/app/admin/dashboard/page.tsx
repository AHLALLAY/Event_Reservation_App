'use client';

import { StatsCard } from "@/components/ui/statusCard";
import NavBar from "@/components/ui/header";
import { useEffect, useState } from "react";

type EventItem = { id?: string; status?: string };
type ReservationItem = { id?: string; status?: string };

export default function AdminDashboard() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [reservations, setReservations] = useState<ReservationItem[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const getEvents = async () => {
        setFetchError(null);
        try {
            const res = await fetch('http://localhost:3001/events');
            const data = await res.json();
            setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            setFetchError('Cannot reach the API.');
            setEvents([]);
        }
    };

    const getReservations = async () => {
        try {
            const res = await fetch('http://localhost:3001/reservations');
            const data = await res.json();
            setReservations(Array.isArray(data) ? data : []);
        } catch {
            setReservations([]);
        }
    };

    useEffect(() => {
        getEvents();
        getReservations();
    }, []);

    const eventsByStatus = {
        published: events.filter((e) => e.status === 'published').length,
        canceled: events.filter((e) => e.status === 'canceled').length,
        draft: events.filter((e) => e.status === 'draft').length,
    };

    const reservationsByStatus = {
        pending: reservations.filter((r) => r.status === 'pending').length,
        confirmed: reservations.filter((r) => r.status === 'confirmed').length,
        refused: reservations.filter((r) => r.status === 'refused').length,
        canceled: reservations.filter((r) => r.status === 'canceled').length,
    };

    return (
        <>
            <NavBar />
            {fetchError && <p className="p-2 text-amber-600 text-sm">{fetchError}</p>}
            <div className="flex p-2">
                <StatsCard
                    title="Events by status"
                    items={[
                        { label: "Published", value: eventsByStatus.published },
                        { label: "Canceled", value: eventsByStatus.canceled },
                        { label: "Draft", value: eventsByStatus.draft },
                    ]}
                />
                <StatsCard
                    title="Reservations by status"
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