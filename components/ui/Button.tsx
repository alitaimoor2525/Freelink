"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "btn-gold",
  outline: "btn-ghost-dark",
  ghost: "btn",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "primary", className, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);