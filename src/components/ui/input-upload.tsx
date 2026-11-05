"use client"

import * as React from "react"
import { Upload } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputUploadVariants = cva(
    // Base button: border 2px solid, background terang, font monospace tebal
    "inline-flex items-center justify-center rounded-md border-2 border-[#111111] bg-[#FDFDFC] font-mono font-bold text-foreground transition-[box-shadow,border-color,background-color,color] duration-150 cursor-pointer select-none outline-none " +
    // Hover state: hard shadow hitam (hanya saat tidak sedang fokus)
    "[&:not(:focus)]:hover:shadow-hard-sm " +
    // Focus state: hard shadow oranye khas neo-brutalist
    "focus:shadow-[3px_3px_0px_#FF5722] " +
    // Disabled state
    "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-400 disabled:text-neutral-500 disabled:shadow-none disabled:hover:shadow-none",
    {
        variants: {
            size: {
                sm: "h-9 px-3 text-xs gap-2",
                md: "h-11 px-4 text-sm gap-2.5",
                lg: "h-14 px-5 text-base gap-3",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

export interface InputUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof inputUploadVariants> {
    /** Teks pada tombol unggah */
    buttonText?: string
    /** Class tambahan khusus untuk tombol */
    buttonClassName?: string
    /** Callback saat berkas berhasil dipilih */
    onFileChange?: (files: FileList | null) => void
}

const InputUpload = React.forwardRef<HTMLInputElement, InputUploadProps>(
    (
        {
            className,
            buttonClassName,
            buttonText = "Pilih berkas",
            size,
            disabled = false,
            accept,
            multiple,
            onChange,
            onFileChange,
            id,
            ...props
        },
        forwardedRef
    ) => {
        const inputRef = React.useRef<HTMLInputElement | null>(null)
        const generatedId = React.useId()
        const inputId = id ?? generatedId

        React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)

        const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            if (disabled) return
            inputRef.current?.click()
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onFileChange?.(e.target.files)
            onChange?.(e)
        }

        return (
            <div className={cn("inline-block", className)}>
                {/* Input file native tersembunyi yang tetap mendukung form register/ref */}
                <input
                    ref={inputRef}
                    id={inputId}
                    type="file"
                    tabIndex={-1}
                    disabled={disabled}
                    accept={accept}
                    multiple={multiple}
                    onChange={handleInputChange}
                    className="sr-only"
                    {...props}
                />

                {/* Tombol aksi bergaya neo-brutalist */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={handleButtonClick}
                    className={cn(inputUploadVariants({ size }), buttonClassName)}
                >
                    <Upload className="size-4 stroke-[2.5]" />
                    <span>{buttonText}</span>
                </button>
            </div>
        )
    }
)

InputUpload.displayName = "InputUpload"

export { InputUpload, inputUploadVariants }