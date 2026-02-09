'use client';

import { StatsCard } from "@/components/ui/statusCard";
import AdminLayout from "../layout";
import NavBar from "@/components/ui/header";

export default function AdminDashboard() {

    return (
        <AdminLayout>
            <NavBar/>
            <div className="flex p-2">
                <StatsCard
                    title="Événements par statut"
                    items={[
                        { label: "Publiés", value: 0 },
                        { label: "Annulés", value: 0 },
                        { label: "Brouillon", value: 0 },
                    ]}
                />
                <StatsCard
                    title="Réservations par statut"
                    items={[
                        { label: "En attente", value: 0 },
                        { label: "Confirmées", value: 0 },
                        { label: "Refusées", value: 0 },
                        { label: "Annulées", value: 0 },
                    ]}
                />
            </div>
        </AdminLayout>
    );
}