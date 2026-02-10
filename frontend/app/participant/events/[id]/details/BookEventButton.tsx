'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BookEventButton({ eventId }: { eventId: string }) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleBook = async () => {
        setError(null);
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
                const data = await res.json();
                setError(data.message || 'Booking failed.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Cannot reach the API.');
        }
    };

    return (
        <div>
            <Button type="button" onClick={handleBook}>Book event</Button>
            {error && <p className="mt-2 text-amber-600 text-sm">{error}</p>}
        </div>
    );
}
