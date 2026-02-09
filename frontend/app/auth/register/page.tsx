'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('participant');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (!fullName || !email || !password || !role) {
                setError("All fields are required");
                return;
            }
            const res = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password, role }),
            })
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "register failed");
                return;
            }
            router.push('/auth/login');

        } catch (err) {
            setError(err instanceof Error ? err.message : "unexpected error");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="max-w-sm mx-auto p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2">
                <div className="flex justify-center">
                    <h1 className="text-xl font-semibold">Register</h1>
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <div className="flex flex-col space-y-4">
                    <Input label="full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="" maxLength={30} />
                    <Input label="email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="" />
                    <Input label="password" id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="" minLength={8} />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="role">roles</label>
                        <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="border rounded px-3 py-2">
                            <option value="">role ...</option>
                            <option value="admin">admin</option>
                            <option value="participant">participant</option>
                        </select>
                    </div>
                </div>
                <Button type="submit" disabled={loading}>{"register"}</Button>
                <div className="felx text-center text-sm font-meduim">
                    <u><a href="/auth/login">login</a></u>
                </div>
            </form>
        </div>
    );
}