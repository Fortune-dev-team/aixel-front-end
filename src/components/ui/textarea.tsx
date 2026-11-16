import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
    // Base styling
    "block w-full box-border rounded-md border-2 border-[#111111] bg-[#FDFDFC] font-sans text-foreground leading-normal " +
    // Transisi halus
    "transition-[box-shadow,border-color,background-color,color] duration-150 " +
    // Hover
    "[&:not(:focus-within)]:hover:shadow-hard-sm " +
    // Focus state
    "focus:shadow-[3px_3px_0px_#FF5722] focus:outline-none " +
    // Placeholder & Selection
    "placeholder:text-muted-foreground selection:bg-[#FF5722]/20 " +
    // Disabled 
    "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-400 disabled:text-neutral-500 disabled:placeholder:text-neutral-400 disabled:shadow-none disabled:hover:shadow-none",
    {
        variants: {
            variant: {
                default: "border-[#111111] text-foreground",
                error:
                    "border-destructive text-destructive focus:shadow-[3px_3px_0px_#ef4444] placeholder:text-destructive/60",
                success:
                    "border-[#10b981] text-[#10b981] focus:shadow-[3px_3px_0px_#10b981] placeholder:text-[#10b981]/60",
            },
            size: {
                sm: "min-h-[80px] px-3 py-2 text-xs",
                md: "min-h-[110px] px-3.5 py-2.5 text-sm",
                lg: "min-h-[140px] px-4 py-3 text-base",
            },
            resize: {
                none: "resize-none",
                vertical: "resize-y",
                horizontal: "resize-x",
                both: "resize",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            resize: "both",
        },
    }
)

export interface TextareaProps
    extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, size, resize, disabled, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                disabled={disabled}
                data-slot="textarea"
                className={cn(textareaVariants({ variant, size, resize }), className)}
                {...props}
            />
        )
    }
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
