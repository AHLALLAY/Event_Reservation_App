'use client';
import NavBar from "@/components/ui/header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EventRow = { id?: string; title?: string; description?: string; place?: string; startDate?: string; endDate?: string; status?: string; capacity?: number };

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

    const updateStatus = async (item: EventRow, newStatus: string) => {
        if (!item.id) return;
        const body = {
            title: item.title,
            description: item.description ?? '',
            startDate: item.startDate,
            endDate: item.endDate,
            place: item.place,
            capacity: item.capacity ?? 1,
            status: newStatus,
        };
        const res = await fetch(`http://localhost:3001/events/event/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.ok) getData();
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <NavBar />
            <Button><Link href="/admin/events/event">Add event</Link></Button>
            {fetchError && (
                <p className="p-2 text-amber-600 text-sm">{fetchError}</p>
            )}
            <div className="p-2">
                <table className="w-full divide-y">
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
                                <td>{item.status}</td>
                                <td>
                                    {item.status === 'draft' && (
                                        <Button type="button" onClick={() => updateStatus(item, 'published')}>Publish</Button>
                                    )}
                                    {(item.status === 'published' || item.status === 'terminer') && (
                                        <Button type="button" onClick={() => updateStatus(item, 'canceled')} className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
                                    )}
                                    {item.status === 'canceled' && '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}