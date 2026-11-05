"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface InputSearchProps extends Omit<InputProps, "type" | "leftIcon" | "rightIcon"> {
    /** Callback opsional saat tombol clear ✕ diklik */
    onClear?: () => void
}

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
    ({ className, value, defaultValue, onChange, onClear, disabled, ...props }, ref) => {
        // Tangani kondisi controlled maupun uncontrolled state
        const [internalValue, setInternalValue] = React.useState<string>(
            (defaultValue as string) ?? ""
        )
        const isControlled = value !== undefined
        const currentValue = isControlled ? String(value ?? "") : internalValue
        const hasValue = currentValue.length > 0

        const inputRef = React.useRef<HTMLInputElement | null>(null)
        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalValue(e.target.value)
            }
            onChange?.(e)
        }

        const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            e.stopPropagation()

            if (!isControlled) {
                setInternalValue("")
            }

            if (inputRef.current) {
                inputRef.current.value = ""
                // Buat synthetic event agar listener onChange native tetap terpanggil
                const syntheticEvent = new Event("input", { bubbles: true })
                inputRef.current.dispatchEvent(syntheticEvent)
                inputRef.current.focus()
            }

            onClear?.()
        }

        return (
            <Input
                ref={inputRef}
                type="search"
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                placeholder={props.placeholder ?? "Cari..."}
                leftIcon={<Search className="text-foreground shrink-0 size-4" />}
                rightIcon={
                    hasValue && !disabled ? (
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={handleClear}
                            className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors p-0.5 pointer-events-auto"
                            aria-label="Hapus pencarian"
                        >
                            <X className="size-3.5 stroke-[2.5]" />
                        </button>
                    ) : null
                }
                className={cn(
                    // Hilangkan icon cancel silang default bawaan browser webkit (Chrome/Safari)
                    "[&::-webkit-search-cancel-button]:appearance-none",
                    className
                )}
                {...props}
            />
        )
    }
)

InputSearch.displayName = "InputSearch"

export { InputSearch }