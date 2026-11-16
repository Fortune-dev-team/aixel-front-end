"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input, type InputProps } from "@/components/ui/input"

export interface InputPasswordProps
  extends Omit<InputProps, "type" | "rightIcon"> {
  /** Memulai input dalam kondisi teks terlihat atau tersembunyi */
  defaultShowPassword?: boolean
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ defaultShowPassword = false, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(defaultShowPassword)

    const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setShowPassword((prev) => !prev)
    }

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        placeholder={props.placeholder ?? "Kata sandi"}
        rightIcon={
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={toggleVisibility}
            className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors p-0.5 pointer-events-auto disabled:cursor-not-allowed disabled:text-neutral-500"
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {showPassword ? (
              <EyeOff className="size-4 stroke-[2]" />
            ) : (
              <Eye className="size-4 stroke-[2]" />
            )}
          </button>
        }
        {...props}
      />
    )
  }
)

InputPassword.displayName = "InputPassword"

export { InputPassword }