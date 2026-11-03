// atoms/Avatar.tsx
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
    /** Initials, e.g. "AB" */
    initials: string;
    size?: AvatarSize;
    className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
};

export const Avatar = ({ initials, size = "md", className = "" }: AvatarProps) => (
    <div
        className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-black font-mono font-bold text-white ${sizeStyles[size]} ${className}`}
    >
        {initials.slice(0, 2).toUpperCase()}
    </div>
);
