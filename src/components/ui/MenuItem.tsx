// molecules/MenuItem.tsx
import { ReactNode } from "react";

export type MenuItemState = "default" | "hover" | "active";

export interface MenuItemProps {
    icon?: ReactNode | string;
    label: string;
    state?: MenuItemState;
    href?: string;
    onClick?: () => void;
    className?: string;
}

const stateStyles: Record<MenuItemState, string> = {
    default: "border-transparent bg-transparent hover:bg-[#f0ede6]",
    hover: "border-transparent bg-[#f0ede6]",
    active: "border-black bg-white font-bold shadow-[3px_3px_0px_0px_#ff4d2d]",
};

export const MenuItem = ({
    icon,
    label,
    state = "default",
    href,
    onClick,
    className = "",
}: MenuItemProps) => {
    const classes = `flex w-full items-center gap-3 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold text-black transition-colors ${stateStyles[state]} ${className}`;
    const content = (
        <>
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{label}</span>
        </>
    );

    return href ? (
        <a href={href} aria-current={state === "active" ? "page" : undefined} className={classes}>
            {content}
        </a>
    ) : (
        <button type="button" onClick={onClick} className={classes}>
            {content}
        </button>
    );
};
