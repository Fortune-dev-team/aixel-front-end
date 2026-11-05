"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
    "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-[#111111] " +
    "transition-[background-color,box-shadow,border-color] duration-150 outline-none select-none p-0.5 " +
    "hover:shadow-[2px_2px_0px_#FF5722] " +
    "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-400 disabled:shadow-none disabled:hover:shadow-none",
    {
        variants: {
            variant: {
                default:
                    "data-[state=checked]:bg-[#FF5722] data-[state=unchecked]:bg-[#EFEFEB]",
                error:
                    "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-[#EFEFEB] hover:shadow-[2px_2px_0px_#ef4444]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface ToggleProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
    (
        {
            className,
            checked: controlledChecked,
            defaultChecked = false,
            onCheckedChange,
            disabled = false,
            variant,
            onClick,
            ...props
        },
        forwardedRef
    ) => {
        const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultChecked)
        const isControlled = controlledChecked !== undefined
        const isChecked = isControlled ? controlledChecked : internalChecked

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) return

            const nextChecked = !isChecked
            if (!isControlled) {
                setInternalChecked(nextChecked)
            }
            onCheckedChange?.(nextChecked)
            onClick?.(e)
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault()
                handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
            }
        }

        return (
            <button
                ref={forwardedRef}
                type="button"
                role="switch"
                aria-checked={isChecked}
                data-state={isChecked ? "checked" : "unchecked"}
                disabled={disabled}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cn(toggleVariants({ variant }), className)}
                {...props}
            >
                {/* Lingkaran knob putih dengan border hitam 2px */}
                <span
                    className={cn(
                        "pointer-events-none block size-5 rounded-full border-2 border-[#111111] bg-[#FDFDFC] " +
                        "transition-transform duration-150",
                        isChecked ? "translate-x-[20px]" : "translate-x-0"
                    )}
                />
            </button>
        )
    }
)

Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }