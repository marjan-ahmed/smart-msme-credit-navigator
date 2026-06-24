"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-display tracking-tight";

    const variantStyles = {
      primary: "bg-teal text-ink hover:bg-teal-hover active:scale-[0.98] shadow-lg shadow-teal/25",
      secondary: "bg-ink text-white hover:bg-ink/90 active:scale-[0.98]",
      ghost: "bg-transparent text-ink hover:bg-slate active:scale-[0.98]",
      outline: "bg-transparent text-ink border-2 border-slate-dark hover:border-teal hover:text-teal active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3 text-sm",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
