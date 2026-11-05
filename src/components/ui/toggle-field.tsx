"use client"

import * as React from "react"
import { Toggle, type ToggleProps } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

export interface ToggleFieldProps extends ToggleProps {
    label: React.ReactNode
    description?: React.ReactNode
    labelClassName?: string
    containerClassName?: string
}

const ToggleField = React.forwardRef<HTMLButtonElement, ToggleFieldProps>(
    (
        {
            label,
            description,
            disabled,
            labelClassName,
            containerClassName,
            id,
            className,
            ...props
        },
        ref
    ) => {
        const generatedId = React.useId()
        const toggleId = id ?? generatedId
        const hasDescription = Boolean(description)

        return (
            <label
                htmlFor={toggleId}
                className={cn(
                    "group inline-flex gap-3 cursor-pointer select-none text-foreground",
                    // Jika ada deskripsi sejajarkan di atas, jika 1 baris ratakan vertikal di tengah
                    hasDescription ? "items-start" : "items-center",
                    disabled && "cursor-not-allowed opacity-60",
                    containerClassName
                )}
            >
                <div className={cn("shrink-0", hasDescription && "pt-0.5")}>
                    <Toggle
                        ref={ref}
                        id={toggleId}
                        disabled={disabled}
                        className={cn("group-hover:shadow-[2px_2px_0px_#FF5722]", className)}
                        {...props}
                    />
                </div>

                <div className="flex flex-col">
                    <span
                        className={cn(
                            "font-mono text-sm font-bold leading-5 text-foreground",
                            labelClassName
                        )}
                    >
                        {label}
                    </span>
                    {hasDescription && (
                        <span className="font-sans text-xs text-muted-foreground leading-tight mt-0.5">
                            {description}
                        </span>
                    )}
                </div>
            </label>
        )
    }
)

ToggleField.displayName = "ToggleField"

export { ToggleField }