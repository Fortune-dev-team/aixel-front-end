"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputCodeVariants = cva(
    // Base
    "shrink-0 p-0 box-border text-center font-mono font-bold leading-none border-2 border-[#111111] bg-[#FDFDFC] text-foreground " +
    // Transisi
    "transition-[box-shadow,border-color,background-color,color] duration-150 " +
    // Hover
    "hover:shadow-hard-sm " +
    // Focus
    "focus:shadow-[3px_3px_0px_#FF5722] focus:outline-none " +
    // Caret & selection
    "caret-transparent selection:bg-transparent " +
    // Disabled 
    "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-400 disabled:text-neutral-500 disabled:shadow-none disabled:hover:shadow-none",
    {
        variants: {
            variant: {
                default: "border-[#111111] text-foreground",
                error:
                    "border-destructive text-destructive focus:shadow-[3px_3px_0px_#ef4444]",
                success:
                    "border-[#10b981] text-[#10b981] focus:shadow-[3px_3px_0px_#10b981]",
            },
            size: {
                sm: "w-10 h-14 text-xl rounded-md",
                md: "w-12 h-16 text-2xl rounded-lg",
                lg: "w-14 h-20 text-3xl rounded-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface InputCodeProps
    extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof inputCodeVariants> {
    /** Jumlah kotak digit (bisa diatur bebas: 4, 6, 8, dll) */
    length?: number
    /** Nilai string saat ini */
    value?: string
    /** Nilai awal */
    defaultValue?: string
    /** Callback perubahan nilai */
    onChange?: (value: string) => void
    /** Callback saat semua kotak selesai terisi */
    onComplete?: (value: string) => void
    /** Status disabled */
    disabled?: boolean
    /** Pesan error di bawah kotak (seperti 'Kode tidak valid.') */
    errorMessage?: string
}

export const InputCode = React.forwardRef<HTMLDivElement, InputCodeProps>(
    (
        {
            length = 6,
            value,
            defaultValue = "",
            onChange,
            onComplete,
            disabled = false,
            variant = "default",
            size = "md",
            errorMessage,
            className,
            ...props
        },
        ref
    ) => {
        const [values, setValues] = React.useState<string[]>(() => {
            const initial = (value ?? defaultValue).slice(0, length).split("")
            return Array.from({ length }, (_, i) => initial[i] ?? "")
        })

        const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

        React.useEffect(() => {
            if (value !== undefined) {
                const valArr = value.slice(0, length).split("")
                setValues(Array.from({ length }, (_, i) => valArr[i] ?? ""))
            }
        }, [value, length])

        const triggerChange = (newValues: string[]) => {
            setValues(newValues)
            const combined = newValues.join("")
            onChange?.(combined)
            if (combined.length === length && !newValues.includes("")) {
                onComplete?.(combined)
            }
        }

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            index: number
        ) => {
            const char = e.target.value.replace(/\D/g, "").slice(-1) // Hanya angka & ambil karakter paling akhir

            const newValues = [...values]
            newValues[index] = char
            triggerChange(newValues)

            if (char && index < length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }

        const handleKeyDown = (
            e: React.KeyboardEvent<HTMLInputElement>,
            index: number
        ) => {
            if (e.key === "Backspace") {
                if (!values[index] && index > 0) {
                    const newValues = [...values]
                    newValues[index - 1] = ""
                    triggerChange(newValues)
                    inputRefs.current[index - 1]?.focus()
                } else {
                    const newValues = [...values]
                    newValues[index] = ""
                    triggerChange(newValues)
                }
            } else if (e.key === "ArrowLeft" && index > 0) {
                inputRefs.current[index - 1]?.focus()
            } else if (e.key === "ArrowRight" && index < length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }

        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault()
            if (disabled) return

            const pastedData = e.clipboardData
                .getData("text/plain")
                .replace(/\D/g, "")
                .slice(0, length)

            if (!pastedData) return

            const newValues = Array.from({ length }, (_, i) => pastedData[i] ?? "")
            triggerChange(newValues)

            const targetIndex = Math.min(pastedData.length, length - 1)
            inputRefs.current[targetIndex]?.focus()
        }

        const isError = variant === "error" || Boolean(errorMessage)

        return (
            <div
                ref={ref}
                className={cn("inline-flex flex-col gap-2", className)}
                {...props}
            >
                <div className="flex items-center gap-2.5 sm:gap-3">
                    {Array.from({ length }).map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={values[index]}
                            disabled={disabled}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            onFocus={(e) => e.target.select()}
                            className={cn(
                                inputCodeVariants({
                                    variant: isError ? "error" : variant,
                                    size,
                                })
                            )}
                            aria-label={`Digit ke-${index + 1}`}
                        />
                    ))}
                </div>
                {errorMessage && (
                    <p className="font-mono text-xs font-bold text-destructive text-right select-none">
                        {errorMessage}
                    </p>
                )}
            </div>
        )
    }
)

InputCode.displayName = "InputCode"
