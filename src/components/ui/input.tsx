import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
    "inline-flex w-full items-center gap-[10px] rounded-md border-2 bg-[#FDFDFC] font-mono text-foreground cursor-text transition-all " +
    // Hover
    "[&:not(:focus-within)]:hover:shadow-hard-sm " +
    // Focus
    "focus-within:shadow-[3px_3px_0px_0px_#FF5722] focus-within:outline-none " +
    // Disabled
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-neutral-300 has-[:disabled]:border-neutral-400 has-[:disabled]:text-neutral-500 has-[:disabled]:shadow-none has-[:disabled]:hover:shadow-none",
    {
        variants: {
            variant: {
                default: "border-[#111111] text-foreground",
                error:
                    "border-destructive text-destructive focus-within:shadow-[3px_3px_0px_0px_#ef4444] [&_input]:placeholder:text-destructive/60",
                success:
                    "border-[#10b981] text-[#10b981] focus-within:shadow-[3px_3px_0px_0px_#10b981] [&_input]:placeholder:text-[#10b981]/60",
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
            onClick,
            ...props
        },
        forwardedRef
    ) => {
        const innerRef = React.useRef<HTMLInputElement | null>(null)

        // Gabungkan forwardedRef dan innerRef
        React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement)

        const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
            onClick?.(e as unknown as React.MouseEvent<HTMLInputElement>)
            // Fokus ke native input jika user mengklik padding atau container
            if (innerRef.current && e.target !== innerRef.current) {
                innerRef.current.focus()
            }
        }

        return (
            <div
                data-slot="input-container"
                onClick={handleContainerClick}
                className={cn(inputVariants({ variant, size }), containerClassName)}
            >
                {leftIcon && (
                    <span className="shrink-0 text-muted-foreground select-none pointer-events-none">
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={innerRef}
                    disabled={disabled}
                    data-slot="input"
                    className={cn(
                        "w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed selection:bg-[#FF5722]/20",
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <span className="shrink-0 text-muted-foreground select-none pointer-events-none">
                        {rightIcon}
                    </span>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

export { Input, inputVariants }
