'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/ui/header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEvent() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [capacity, setCapacity] = useState(1);
    const [place, setPlace] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (!title || !startDate || !endDate || !place) {
                setError("Titre, dates et lieu sont requis.");
                setLoading(false);
                return;
            }
            const res = await fetch('http://localhost:3001/events/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description: description || undefined,
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                    place,
                    capacity: Number(capacity),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Erreur lors de la création.");
                setLoading(false);
                return;
            }
            router.push('/admin/events');
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur réseau");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="max-w-sm mx-auto p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2">
                    <div className="flex justify-center">
                        <h1 className="text-xl font-semibold">Ajouter un événement</h1>
                    </div>
                    {error && <span className="text-red-500 text-sm">{error}</span>}
                    <div className="flex flex-col space-y-4">
                        <Input label="Titre" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="" maxLength={20} />
                        <Input label="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="" />
                        <Input label="Début" id="startDate" value={startDate} type="datetime-local" onChange={(e) => setStartDate(e.target.value)} className="" />
                        <Input label="Fin" id="endDate" value={endDate} type="datetime-local" onChange={(e) => setEndDate(e.target.value)} className="" />
                        <Input label="Lieu" id="place" value={place} type="text" onChange={(e) => setPlace(e.target.value)} className="" maxLength={100} />
                        <Input label="Capacité" id="capacity" type="number" value={String(capacity)} onChange={(e) => setCapacity(Number(e.target.value) || 1)} className="" min={1} />
                    </div>
                    <Button type="submit" disabled={loading}>Créer l'événement</Button>
                </form>
            </div>
        </>
    );
}
