import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string,
    error?: string,
}

export function Input({ label, error, id, type = "text", className, onChange, value, ...restProps }: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id}>{label}</label>
            )}
            <input type={type} id={id} className={className} onChange={onChange} value={value} {...restProps} />
            {error && <span className="text-sm text-red-500 dark:text-red-400">{error}</span>}
        </div>
    );
}