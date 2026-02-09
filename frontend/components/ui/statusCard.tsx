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
        <div className="m-4 p-8 border border-white rounded-lg w-1/2">
            <h1 className="text-xl flex justify-center font-medium text-bold">{title}</h1>
            <ul className="flex justify-between mt-4">
                {items.map(({ label, value }, index) => (
                    <li key={index}><span className="text-green-500">{label}:</span> {value}</li>
                ))}
            </ul>
        </div>
    );
}
