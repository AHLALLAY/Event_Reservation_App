import { ButtonHTMLAttributes } from "react";


export function Button({ type = 'button', children, onClick, className, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const defaultStyle = `bg-blue-300 text-slate-800 px-2 py-1 rounded-md font-medium ${className}`;
    
    return (
        <button type={type} onClick={onClick} className={defaultStyle} {...restProps}>
            {children}
        </button>
    );
}