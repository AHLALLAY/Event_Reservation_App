import { notFound } from "next/navigation";
import NavBar from "@/components/ui/header";
import BookEventButton from "./BookEventButton";
import Link from "next/link";


type EventDetail = {
    id?: string;
    title?: string;
    description?: string;
    place?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    capacity?: number;
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let event: EventDetail | null = null;
    try {
        const res = await fetch(`http://localhost:3001/events/${id}`);
        if (!res.ok) {
            notFound();
            return null;
        }
        event = await res.json();
    } catch {
        notFound();
        return null;
    }

    if (!event || event.status !== 'published') {
        notFound();
        return null;
    }

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
            <main className="mx-auto max-w-2xl px-4 py-6">
                <Link href="/participant/events" className="text-sm underline mb-4 inline-block">← Back to events</Link>
                <article className="rounded border p-6">
                    <h1 className="text-2xl font-semibold">{event.title ?? '—'}</h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">{event.description ?? '—'}</p>
                    <dl className="mt-4 space-y-2">
                        <dt className="font-medium">Place</dt>
                        <dd>{event.place ?? '—'}</dd>
                        <dt className="font-medium">Start</dt>
                        <dd>{formatDate(event.startDate)}</dd>
                        <dt className="font-medium">End</dt>
                        <dd>{formatDate(event.endDate)}</dd>
                        <dt className="font-medium">Capacity</dt>
                        <dd>{event.capacity ?? '—'}</dd>
                    </dl>
                    <div className="mt-6">
                        <BookEventButton eventId={event.id!} />
                    </div>
                </article>
            </main>
        </>
    );
}
