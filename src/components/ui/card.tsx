// Card.tsx
import { ReactNode } from "react";
import { Card as HeroUICard } from "@heroui/react";

export interface CardProps {
    step?: string;
    title: string;
    description?: string;
    children?: ReactNode;
    className?: string;
}

export const Card = ({
    step,
    title,
    description,
    children,
    className = "",
}: CardProps) => {
    return (
        <HeroUICard
            className={`bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 ${className}`}
        >
            <HeroUICard.Header className="flex flex-col items-start gap-1 p-0 mb-3">
                {step && (
                    <span className="text-2xl font-black text-[#ff3b00] tracking-tight font-mono">
                        {step}
                    </span>
                )}
                <h3 className="text-base font-bold text-black leading-snug">
                    {title}
                </h3>
            </HeroUICard.Header>

            {(description || children) && (
                <HeroUICard.Content className="p-0 text-xs text-zinc-500 leading-relaxed font-normal">
                    {description && <p>{description}</p>}
                    {children}
                </HeroUICard.Content>
            )}
        </HeroUICard>
    );
};