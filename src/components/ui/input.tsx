import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
    // Base
    "inline-flex w-full items-center gap-[10px] rounded-md border-2 bg-[#FDFDFC] font-mono text-foreground transition-all " +
    // Hover
    "[&:not(:focus-within)]:hover:shadow-hard-sm " +
    // Focus
    "focus-within:shadow-[3px_3px_0px_0px_var(--primary,#ff5722)] focus-within:outline-none " +
    // Disabled
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-neutral-300 has-[:disabled]:border-neutral-400 has-[:disabled]:text-neutral-500 has-[:disabled]:shadow-none has-[:disabled]:hover:shadow-none",
    {
        variants: {
            variant: {
                default: "border-border text-foreground",
                error:
                    "border-destructive text-destructive focus-within:shadow-[3px_3px_0px_0px_var(--destructive,#ef4444)] [&_input]:placeholder:text-destructive/60",
                success:
                    "border-success text-success focus-within:shadow-[3px_3px_0px_0px_var(--success,#10b981)] [&_input]:placeholder:text-success/60",
            },
            size: {
                sm: "h-8 px-2 py-2 text-xs [&_svg]:size-3.5",
                md: "h-10 px-3 py-2 text-sm [&_svg]:size-4",
                lg: "h-12 px-4 py-2 text-base [&_svg]:size-5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface InputProps
    extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            containerClassName,
            variant,
            size,
            leftIcon,
            rightIcon,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <div
                data-slot="input-container"
                className={cn(inputVariants({ variant, size }), containerClassName)}
            >
                {leftIcon && (
                    <span className="shrink-0 text-muted-foreground select-none">
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={ref}
                    disabled={disabled}
                    data-slot="input"
                    className={cn(
                        "w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <span className="shrink-0 text-muted-foreground select-none">
                        {rightIcon}
                    </span>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

export { Input, inputVariants }