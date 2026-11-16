"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@heroui/react";

export interface AuthSubmitButtonProps extends ButtonProps {
    label?: string;
    loadingText?: string;
    isLoading?: boolean;
}

export function AuthSubmitButton({
    label = "Masuk",
    loadingText = "Memproses...",
    isLoading = false,
    isDisabled,
    type = "submit",
    fullWidth = true,
    className = "",
    children,
    ...buttonProps
}: AuthSubmitButtonProps) {
    return (
        <Button
            type={type}
            fullWidth={fullWidth}
            isDisabled={isDisabled || isLoading}
            className={`mt-1 h-11 rounded-lg border-[1.5px] border-black bg-[#ff4405] font-semibold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60 data-[hovered=true]:bg-[#f23d00] data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none ${className}`}
            {...buttonProps}
        >
            {isLoading ? loadingText : (children ?? label)}
        </Button>
    );
}