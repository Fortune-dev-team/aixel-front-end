"use client"

import * as React from "react"
import { Checkbox, type CheckboxProps } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface CheckboxFieldProps extends CheckboxProps {
    label: React.ReactNode
    description?: React.ReactNode
    containerClassName?: string
    labelClassName?: string
}

const CheckboxField = React.forwardRef<HTMLButtonElement, CheckboxFieldProps>(
    ({ label, description, containerClassName, labelClassName, disabled, id, className, ...props }, ref) => {
        const generatedId = React.useId()
        const inputId = id ?? generatedId

        return (
            <label
                htmlFor={inputId}
                className={cn(
                    "group inline-flex items-start gap-2.5 cursor-pointer select-none text-foreground font-sans",
                    disabled && "cursor-not-allowed opacity-60",
                    containerClassName
                )}
            >
                <div className="pt-0.5">
                    <Checkbox
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        className={cn("group-hover:shadow-hard-primary", className)}
                        {...props}
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className={cn("text-sm leading-normal font-medium text-foreground", labelClassName)}>
                        {label}
                    </span>
                    {description && (
                        <span className="text-xs text-muted-foreground">{description}</span>
                    )}
                </div>
            </label>
        )
    }
)

CheckboxField.displayName = "CheckboxField"

export { CheckboxField }