"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Radio } from "@/components/ui/radio"
import { RadioGroupContext } from "@/components/ui/radio-field"
import { cn } from "@/lib/utils"

const answerOptionVariants = cva(
    "group relative flex w-full items-center gap-3.5 rounded-xl border-2 border-[#111111] p-3.5 sm:px-4 sm:py-3.5 cursor-pointer select-none outline-none " +
    "transition-[box-shadow,background-color,border-color,transform] duration-150 " +
    "[&:not([data-state=checked])]:hover:translate-x-[-1px] [&:not([data-state=checked])]:hover:translate-y-[-1px]",
    {
        variants: {
            state: {
                unchecked: "bg-[#FDFDFC] shadow-hard-sm",
                checked: "bg-[#FFEDE6] shadow-[3px_3px_0px_#FF5722]",
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
    label: React.ReactNode
    description?: React.ReactNode
    value: string
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
        const group = React.useContext(RadioGroupContext)
        const generatedId = React.useId()
        const inputId = id ?? generatedId

        const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultChecked)
        const isControlled = controlledChecked !== undefined

        // Prioritaskan RadioGroup jika ada; jika tidak, gunakan controlled atau local state
        const isChecked = group
            ? group.value === value
            : isControlled
                ? controlledChecked
                : internalChecked

        const isDisabled = disabled || group?.disabled

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isDisabled) return

            if (group) {
                group.onValueChange?.(value)
            } else if (!isControlled) {
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
                    isDisabled &&
                    "cursor-not-allowed bg-neutral-200 border-neutral-400 opacity-60 shadow-none hover:translate-x-0 hover:translate-y-0",
                    className
                )}
            >
                <Radio
                    ref={ref}
                    id={inputId}
                    name={group?.name ?? name}
                    value={value}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={handleChange}
                    containerClassName="hover:shadow-none group-hover:shadow-none"
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