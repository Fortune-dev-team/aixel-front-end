"use client"

import * as React from "react"
import { Radio, type RadioProps } from "@/components/ui/radio"
import { cn } from "@/lib/utils"

// Context untuk sinkronisasi nilai di dalam RadioGroup
interface RadioGroupContextValue {
    name?: string
    value?: string
    onValueChange?: (val: string) => void
    disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    disabled?: boolean
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ name, value: controlledValue, defaultValue, onValueChange, disabled, className, children, ...props }, ref) => {
        const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? "")
        const isControlled = controlledValue !== undefined
        const currentValue = isControlled ? controlledValue : internalValue

        const generatedName = React.useId()
        const groupName = name ?? generatedName

        const handleValueChange = (val: string) => {
            if (!isControlled) {
                setInternalValue(val)
            }
            onValueChange?.(val)
        }

        return (
            <RadioGroupContext.Provider
                value={{
                    name: groupName,
                    value: currentValue,
                    onValueChange: handleValueChange,
                    disabled,
                }}
            >
                <div
                    ref={ref}
                    role="radiogroup"
                    className={cn("flex flex-col gap-4", className)}
                    {...props}
                >
                    {children}
                </div>
            </RadioGroupContext.Provider>
        )
    }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioFieldProps extends Omit<RadioProps, "onChange"> {
    label: React.ReactNode
    description?: React.ReactNode
    value?: string
    labelClassName?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioField = React.forwardRef<HTMLInputElement, RadioFieldProps>(
    (
        {
            label,
            description,
            value = "",
            disabled,
            labelClassName,
            containerClassName,
            id,
            onChange,
            ...props
        },
        ref
    ) => {
        const group = React.useContext(RadioGroupContext)
        const generatedId = React.useId()
        const inputId = id ?? generatedId

        const isChecked = group ? group.value === value : props.checked
        const isDisabled = disabled || group?.disabled

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (group) {
                group.onValueChange?.(value)
            }
            onChange?.(e)
        }
        const hasDescription = Boolean(description)

        return (
            <label
                htmlFor={inputId}
                className={cn(
                    "group inline-flex gap-3 cursor-pointer select-none text-foreground",
                    // Jika ada description sejajarkan di atas, jika 1 baris ratakan tengah sempurna
                    hasDescription ? "items-start" : "items-center",
                    isDisabled && "cursor-not-allowed opacity-60",
                    containerClassName
                )}
            >
                <div className={cn("shrink-0", hasDescription && "pt-0.5")}>
                    <Radio
                        ref={ref}
                        id={inputId}
                        name={group?.name ?? props.name}
                        value={value}
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={handleChange}
                        containerClassName="group-hover:shadow-hard-primary"
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
RadioField.displayName = "RadioField"