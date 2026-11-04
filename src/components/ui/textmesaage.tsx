import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const textMessage = tv({
  slots: { root: "inline-flex items-center gap-1.5 font-sans font-medium", icon: "shrink-0" },
  variants: {
    variant: {
      error: { root: "text-[#B42318]" },
      success: { root: "text-[#1A8F4C]" },
      warning: { root: "text-[#C77700]" },
      info: { root: "text-[#2563EB]" },
    },
    size: {
      sm: { root: "text-xs", icon: "size-3.5" },
      md: { root: "text-sm", icon: "size-4" },
    },
    soft: { true: { root: "font-normal opacity-80" } },
  },
  defaultVariants: { variant: "error", size: "md" },
});

const icons = {
  error: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
} as const;

export interface TextMessageProps extends VariantProps<typeof textMessage> {
  children: React.ReactNode;
  hideIcon?: boolean;
  className?: string;
}

export function TextMessage({
  children,
  variant = "error",
  size,
  soft,
  hideIcon = false,
  className,
}: TextMessageProps) {
  const s = textMessage({ variant, size, soft });
  const Icon = icons[variant ?? "error"];
  return (
    <p role={variant === "error" ? "alert" : "status"} className={s.root({ className })}>
      {!hideIcon && <Icon aria-hidden className={s.icon()} />}
      {children}
    </p>
  );
}