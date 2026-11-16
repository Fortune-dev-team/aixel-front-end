"use client";

import * as React from "react";
import {
    Description,
    FieldError,
    Input,
    Label,
    TextField,
    type InputProps,
    type TextFieldProps,
} from "@heroui/react";

export interface TextFieldInputProps extends Omit<TextFieldProps, "children"> {
    label: string;
    labelHint?: string;
    placeholder?: string;
    description?: string;
    errorMessage?: string;
    inputClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
    inputProps?: Omit<InputProps, "placeholder" | "className">;
}

export function TextFieldInput({
    label,
    labelHint,
    placeholder,
    description,
    errorMessage,
    className = "",
    inputClassName = "",
    labelClassName = "",
    descriptionClassName = "",
    errorClassName = "",
    inputProps,
    isInvalid,
    ...textFieldProps
}: TextFieldInputProps) {
    return (
        <TextField
            isInvalid={isInvalid ?? Boolean(errorMessage)}
            className={`flex flex-col gap-1.5 ${className}`}
            {...textFieldProps}
        >
            <div className="flex items-baseline gap-1.5">
                <Label
                    className={`font-mono text-sm font-bold text-black after:ml-0.5 after:text-[#e11d48] ${labelClassName}`}
                >
                    {label}
                </Label>
                {labelHint && (
                    <span className="text-xs text-neutral-600">{labelHint}</span>
                )}
            </div>

            <Input
                placeholder={placeholder}
                className={`h-11 w-full rounded-lg border-[1.5px] border-black bg-white px-3.5 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${inputClassName}`}
                {...inputProps}
            />

            {description && (
                <Description className={`text-xs text-neutral-600 ${descriptionClassName}`}>
                    {description}
                </Description>
            )}

            <FieldError className={`text-xs text-[#e11d48] ${errorClassName}`}>
                {errorMessage}
            </FieldError>
        </TextField>
    );
}