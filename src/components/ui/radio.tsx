"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const radioVariants = cva(
    // Base circle
    "relative inline-flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-border bg-[#FDFDFC] " +
    "transition-[box-shadow,border-color,background-color] duration-150 select-none cursor-pointer outline-none " +
    // Hover
    "hover:shadow-hard-primary " +
    // Disabled
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-neutral-300 has-[:disabled]:border-neutral-400 has-[:disabled]:shadow-none has-[:disabled]:hover:shadow-none",
    {
        variants: {
            variant: {
                default: "border-border",
                error: "border-destructive hover:shadow-hard-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof radioVariants> {
    containerClassName?: string
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            className,
            containerClassName,
            variant,
            disabled,
            checked,
            defaultChecked,
            onChange,
            ...props
        },
        ref
    ) => {
        return (
            <span className={cn(radioVariants({ variant }), containerClassName)}>
                <input
                    ref={ref}
                    type="radio"
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    className={cn("peer sr-only", className)}
                    {...props}
                />
                {/* Titik lingkaran oranye solid saat dipilih */}
                <span className="size-2 rounded-full bg-primary scale-0 transition-transform duration-150 peer-checked:scale-100" />
            </span>
        )
    }
)

Radio.displayName = "Radio"

export { Radio, radioVariants }