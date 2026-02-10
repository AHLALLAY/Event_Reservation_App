import { ReactNode } from "react";

export type StatsCardItem = {
    label: string;
    value: ReactNode;
};

type StatsCardProps = {
    title: string;
    items: StatsCardItem[];
};

export function StatsCard({ title, items }: StatsCardProps) {
    return (
        <div className="min-w-[260px] flex-1 rounded-lg border border-white p-6">
            <h1 className="text-xl flex justify-center font-medium text-bold">{title}</h1>
            <ul className="mt-4 flex flex-col gap-2">
                {items.map(({ label, value }, index) => (
                    <li key={index} className="flex justify-between gap-4"><span className="text-green-500">{label}:</span> {value}</li>
                ))}
            </ul>
        </div>
    );
}
