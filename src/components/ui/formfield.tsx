"use client";

import { FieldError, Input, TextField, type TextFieldProps } from "@heroui/react";
import { TextLabel } from "@/components/ui/textlabel";
import { TextHelper } from "@/components/ui/texthelper";

export interface FormFieldProps extends Omit<TextFieldProps, "children"> {
    label: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    optional?: boolean;
    type?: "text" | "email" | "password" | "tel" | "url";
}

export function FormField({
    label,
    placeholder,
    helperText,
    errorMessage,
    optional = false,
    type = "text",
    isRequired,
    isInvalid,
    className,
    ...props
}: FormFieldProps) {
    return (
        <TextField
            className={`flex flex-col gap-1 ${className ?? ""}`}
            isRequired={isRequired}
            isInvalid={isInvalid || Boolean(errorMessage)}
            type={type}
            {...props}
        >
            <TextLabel required={isRequired} optional={optional}>
                {label}
            </TextLabel>
            <Input
                placeholder={placeholder}
                className={[
                    "rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 py-2 text-sm text-[#0A0A0A] shadow-none outline-none",
                    "placeholder:text-[#9A9A9A]",
                    "focus:border-[#FF4A1C]",
                    "data-[invalid=true]:rounded-md data-[invalid=true]:border-[#E5484D] data-[invalid=true]:bg-white",
                ].join(" ")}
            />
            {helperText && !errorMessage && <TextHelper size="sm">{helperText}</TextHelper>}
            <FieldError className="text-[10px] text-[#B42318]">{errorMessage}</FieldError>
        </TextField>
    );
}