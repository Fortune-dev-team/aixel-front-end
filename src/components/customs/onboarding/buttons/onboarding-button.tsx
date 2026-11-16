"use client";

import { Button } from "@heroui/react";

interface OnboardingButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    isDisabled?: boolean;
    onPress?: () => void;
}

export function OnboardingButton({
    children,
    variant = "primary",
    isDisabled = false,
    onPress,
}: OnboardingButtonProps) {
    const variantStyles =
        variant === "primary"
            ? "bg-[#ff4405] px-5 data-[hovered=true]:bg-[#f23d00]"
            : "bg-white px-4 data-[hovered=true]:bg-neutral-100";

    return (
        <Button
            type="button"
            isDisabled={isDisabled}
            onPress={onPress}
            className={`h-9 rounded-lg border-[1.5px] border-black font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[disabled=true]:opacity-50 data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none ${variantStyles}`}
        >
            {children}
        </Button>
    );
}