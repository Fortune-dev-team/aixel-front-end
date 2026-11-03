// Button.tsx
import { ReactNode } from "react";
import { Button as HeroUIButton } from "@heroui/react";

export type ButtonVariant =
    | "coral"
    | "black"
    | "white"
    | "red"
    | "amber"
    | "green"
    | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isIconOnly?: boolean;
    children?: ReactNode;
    onPress?: () => void;
    className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    coral: "bg-[#ff4d2d] text-white border-black hover:bg-[#e03d1e]",
    black: "bg-black text-white border-black hover:bg-zinc-800",
    white: "bg-white text-black border-black hover:bg-zinc-100",
    red: "bg-[#d92626] text-white border-black hover:bg-[#b81d1d]",
    amber: "bg-[#d97706] text-white border-black hover:bg-[#b45b03]",
    green: "bg-[#059669] text-white border-black hover:bg-[#047857]",
    ghost: "bg-transparent text-black border-transparent shadow-none hover:bg-zinc-200/60",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
};

export const Button = ({
    variant = "coral",
    size = "md",
    leftIcon,
    rightIcon,
    isIconOnly = false,
    children,
    onPress,
    className = "",
}: ButtonProps) => {
    const baseStyles =
        "inline-flex items-center justify-center font-mono font-bold border-2 rounded-lg transition-all shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";

    const iconOnlyStyles = isIconOnly ? "!px-0 aspect-square w-10 justify-center" : "";

    return (
        <HeroUIButton
            onPress={onPress}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${iconOnlyStyles} ${className}`}
        >
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </HeroUIButton>
    );
};