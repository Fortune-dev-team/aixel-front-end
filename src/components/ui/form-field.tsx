"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends React.ComponentProps<"div"> {
    label?: React.ReactNode
    required?: boolean
    description?: React.ReactNode
    error?: React.ReactNode
    htmlFor?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
    (
        {
            className,
            label,
            required = false,
            description,
            error,
            htmlFor,
            children,
            ...props
        },
        ref
    ) => {
        const id = React.useId()
        const fieldId = htmlFor ?? id
        const descriptionId = `${fieldId}-description`
        const errorId = `${fieldId}-error`

        return (
            <div
                ref={ref}
                data-slot="form-field"
                className={cn("flex flex-col gap-1.5 w-full", className)}
                {...props}
            >
                {label && (
                    <label
                        htmlFor={fieldId}
                        className="font-mono text-sm font-bold text-foreground inline-flex items-center gap-1 select-none"
                    >
                        {label}
                        {required && (
                            <span className="text-destructive font-bold text-sm" aria-hidden="true">
                                *
                            </span>
                        )}
                    </label>
                )}
                <div className="relative">
                    {React.isValidElement(children)
                        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                            id: (children.props as Record<string, unknown>).id ?? fieldId,
                            variant: error ? "error" : (children.props as Record<string, unknown>).variant,
                            "aria-describedby": error
                                ? errorId
                                : description
                                    ? descriptionId
                                    : undefined,
                            "aria-invalid": Boolean(error),
                        })
                        : children}
                </div>
                {error ? (
                    <p
                        id={errorId}
                        className="font-sans text-xs text-destructive leading-tight select-none"
                    >
                        {error}
                    </p>
                ) : description ? (
                    <p
                        id={descriptionId}
                        className="font-sans text-xs text-muted-foreground leading-tight select-none"
                    >
                        {description}
                    </p>
                ) : null}
            </div>
        )
    }
)

FormField.displayName = "FormField"

export { FormField }