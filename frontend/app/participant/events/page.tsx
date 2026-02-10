import EventsListClient, { type EventItem } from "./EventsListClient";


export default async function ParticipantEventsPage() {
    let events: EventItem[] = [];
    try {
        const res = await fetch('http://localhost:3001/events?status=published', { cache: 'no-store' });
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        events = list.filter((e: EventItem) => e.status === 'published');
    } catch {
        events = [];
    }

    return <EventsListClient initialEvents={events} />;
}
