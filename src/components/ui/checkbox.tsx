"use client"

import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer inline-flex size-5 shrink-0 items-center justify-center rounded-[6px] border-2 border-[#111111] bg-[#FDFDFC] " +
    "transition-[box-shadow,border-color,background-color] duration-150 select-none cursor-pointer outline-none " +
    "hover:shadow-[2px_2px_0px_#FF5722] " +
    "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-400 disabled:shadow-none disabled:hover:shadow-none",
  {
    variants: {
      variant: {
        default: "border-[#111111]",
        error: "border-destructive hover:shadow-[2px_2px_0px_#ef4444]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type CheckedState = boolean | "indeterminate"

export interface CheckboxProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "value" | "onChange" | "checked" | "defaultChecked"
    >,
    VariantProps<typeof checkboxVariants> {
  checked?: CheckedState
  defaultChecked?: CheckedState
  onCheckedChange?: (checked: CheckedState) => void
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
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
    const [internalChecked, setInternalChecked] = React.useState<CheckedState>(defaultChecked)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked

    const innerRef = React.useRef<HTMLButtonElement | null>(null)
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLButtonElement)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return

      const nextChecked = isChecked === true ? false : true
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
        ref={innerRef}
        type="button"
        role="checkbox"
        aria-checked={isChecked === "indeterminate" ? "mixed" : isChecked}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(checkboxVariants({ variant }), className)}
        {...props}
      >
        {isChecked === true && (
          <Check className="size-3.5 stroke-[3] text-[#FF5722]" />
        )}
        {isChecked === "indeterminate" && (
          <Minus className="size-3.5 stroke-[3] text-[#FF5722]" />
        )}
      </button>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }

