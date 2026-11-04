"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Radio } from "@/components/ui/radio"
import { cn } from "@/lib/utils"

const answerOptionVariants = cva(
    "group relative flex w-full items-center gap-3.5 rounded-xl border-2 border-border p-3.5 sm:px-4 sm:py-3.5 cursor-pointer select-none outline-none " +
    "transition-[box-shadow,background-color,border-color,transform] duration-150 " +
    "[&:not([data-state=checked])]:hover:translate-x-[-1px] [&:not([data-state=checked])]:hover:translate-y-[-1px]",
    {
        variants: {
            state: {
                unchecked: "bg-[#FDFDFC] shadow-hard-sm",
                checked: "bg-[#FFEDE6] shadow-hard-primary",
            },
        },
        defaultVariants: {
            state: "unchecked",
        },
    }
)

export interface AnswerOptionProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof answerOptionVariants> {
    /** Label teks pilihan jawaban */
    label: React.ReactNode
    /** Keterangan tambahan (opsional) */
    description?: React.ReactNode
    /** Nilai opsi */
    value: string
    /** Class tambahan untuk teks label */
    labelClassName?: string
}

const AnswerOption = React.forwardRef<HTMLInputElement, AnswerOptionProps>(
    (
        {
            className,
            label,
            description,
            value,
            name,
            checked: controlledChecked,
            defaultChecked = false,
            disabled = false,
            labelClassName,
            id,
            onChange,
            ...props
        },
        ref
    ) => {
        const generatedId = React.useId()
        const inputId = id ?? generatedId

        const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultChecked)
        const isChecked = isControlled ? controlledChecked : internalChecked

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return
            if (!isControlled) {
                setInternalChecked(e.target.checked)
            }
            onChange?.(e)
        }

        return (
            <label
                htmlFor={inputId}
                data-state={isChecked ? "checked" : "unchecked"}
                className={cn(
                    answerOptionVariants({
                        state: isChecked ? "checked" : "unchecked",
                    }),
                    // Styling disabled diterapkan langsung di sini agar tipe HTML native tidak berbenturan
                    disabled &&
                    "cursor-not-allowed bg-neutral-200 border-neutral-400 opacity-60 shadow-none hover:translate-x-0 hover:translate-y-0",
                    className
                )}
            >
                <Radio
                    ref={ref}
                    id={inputId}
                    name={name}
                    value={value}
                    checked={isChecked}
                    disabled={disabled}
                    onChange={handleChange}
                    containerClassName="pointer-events-none hover:shadow-none group-hover:shadow-none"
                    {...props}
                />

                <div className="flex flex-col">
                    <span
                        className={cn(
                            "font-sans text-sm font-medium leading-none text-foreground",
                            labelClassName
                        )}
                    >
                        {label}
                    </span>
                    {description && (
                        <span className="font-sans text-xs text-muted-foreground mt-1">
                            {description}
                        </span>
                    )}
                </div>
            </label>
        )
    }
)

AnswerOption.displayName = "AnswerOption"

export { AnswerOption, answerOptionVariants }