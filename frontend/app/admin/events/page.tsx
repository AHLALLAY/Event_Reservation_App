'use client';
import NavBar from "@/components/ui/header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EventRow = { id?: string; title?: string; description?: string; place?: string; startDate?: string; endDate?: string; status?: string; capacity?: number };

const statusLabel: Record<string, string> = {
    draft: 'Draft',
    published: 'Published',
    canceled: 'Canceled',
    ended: 'Ended',
};

export default function EventsPage() {
    const [data, setData] = useState<EventRow[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const getData = async () => {
        setFetchError(null);
        try {
            const res = await fetch('http://localhost:3001/events');
            const data = await res.json();
            setData(Array.isArray(data) ? data : []);
        } catch (err) {
            setFetchError('Cannot reach the API. Make sure the backend is running on http://localhost:3001');
            setData([]);
        }
    };

    const publishEvent = async (item: EventRow) => {
        if (!item.id) return;
        const res = await fetch(`http://localhost:3001/events/event/${item.id}/publish`, {
            method: 'PATCH',
        });
        if (res.ok) getData();
        else {
            const err = await res.json();
            setFetchError(err.message);
        }
    };

    const cancelEvent = async (item: EventRow) => {
        if (!item.id) return;
        const res = await fetch(`http://localhost:3001/events/event/${item.id}/cancel`, {
            method: 'PATCH',
        });
        if (res.ok) getData();
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <NavBar />
            <main className="mx-auto max-w-6xl px-4 py-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <Button><Link href="/admin/events/event">Add event</Link></Button>
                    {fetchError && (
                        <p className="text-amber-600 text-sm">{fetchError}</p>
                    )}
                </div>
                <div className="overflow-x-auto rounded border">
                <table className="w-full min-w-[640px] divide-y">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>place</th>
                            <th>start</th>
                            <th>end</th>
                            <th>status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id ?? index}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.place}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{statusLabel[item.status ?? ''] ?? item.status}</td>
                                <td>
                                    {item.status === 'draft' && (
                                        <Button type="button" onClick={() => publishEvent(item)}>Publish</Button>
                                    )}
                                    {(item.status === 'published' || item.status === 'ended') && (
                                        <Button type="button" onClick={() => cancelEvent(item)} className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
                                    )}
                                    {item.status === 'canceled' && '—'}
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