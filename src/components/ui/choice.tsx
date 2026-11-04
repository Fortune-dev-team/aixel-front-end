"use client";

import { Radio, RadioGroup, Label, type RadioGroupProps } from "@heroui/react";
import { tv, type VariantProps } from "tailwind-variants";

const choice = tv({
  base: [
    "inline-flex cursor-pointer items-center justify-center rounded-md border-2 border-[#0A0A0A] bg-[#FDFCFA]",
    "font-mono font-bold text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] transition-all",
    "data-[hovered=true]:bg-[#EFEDE8]",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    "data-[selected=true]:bg-[#FF4A1C]",
    "data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-[#FF4A1C]",
    "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 data-[disabled=true]:shadow-none",
  ],
  variants: {
    size: { sm: "size-6 text-[10px]", md: "size-8 text-xs", lg: "size-10 text-sm" },
  },
  defaultVariants: { size: "sm" },
});

export interface ChoiceGroupProps
  extends Omit<RadioGroupProps, "children" | "orientation">,
    VariantProps<typeof choice> {
  count?: number;
  values?: string[];
  groupLabel: string;
}

export function ChoiceGroup({
  count = 3,
  values,
  groupLabel,
  size,
  className,
  ...props
}: ChoiceGroupProps) {
  const items = values ?? Array.from({ length: count }, (_, i) => String(i + 1));
  return (
    <RadioGroup
      aria-label={groupLabel}
      orientation="horizontal"
      className={`flex flex-row gap-2 ${className ?? ""}`}
      {...props}
    >
      {items.map((v) => (
        <Choice key={v} value={v} size={size} />
      ))}
    </RadioGroup>
  );
}

export interface ChoiceProps extends VariantProps<typeof choice> {
  value: string;
  isDisabled?: boolean;
}

export function Choice({ value, size, isDisabled }: ChoiceProps) {
  return (
    <Radio value={value} isDisabled={isDisabled} className={choice({ size })}>
      <Label className="cursor-pointer">{value}</Label>
    </Radio>
  );
}