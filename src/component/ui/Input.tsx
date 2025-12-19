import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`px-3 py-2 border rounded-md outline-none transition-all
            ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-1 focus:ring-blue-500"}
            ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";