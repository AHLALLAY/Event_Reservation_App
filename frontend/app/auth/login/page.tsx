'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (!email || !password) {
                setError("All fields are required");
                return;
            }
            const res = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "login failed");
                return;
            }
            const user = {
                name: data.user.fullName,
                email: data.user.email,
                role: data.user.role,
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(user));
            router.push(`/${data.user.role}/dashboard`);

        } catch (err) {
            setError(err instanceof Error ? err.message : "");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="max-w-sm mx-auto p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2">
                <div className="flex justify-center">
                    <h1 className="text-xl font-semibold">Login</h1>
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <div className="flex flex-col space-y-4">
                    <Input label="email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="" />
                    <Input label="password" id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="" minLength={8} />
                </div>
                <Button type="submit" disabled={loading}>{"login"}</Button>

                <div className="felx text-center text-sm font-meduim">
                    <u><a href="/auth/register">register</a></u>
                </div>
            </form>
        </div>
    );
}