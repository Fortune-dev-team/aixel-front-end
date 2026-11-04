"use client";

import { Radio, RadioGroup, type RadioGroupProps } from "@heroui/react";

export interface AnswerOptionItem {
    value: string;
    label: string;
    isDisabled?: boolean;
}

export interface AnswerOptionGroupProps extends Omit<RadioGroupProps, "children"> {
    options: AnswerOptionItem[];
    groupLabel: string;
}

export function AnswerOptionGroup({ options, groupLabel, className, ...props }: AnswerOptionGroupProps) {
    return (
        <RadioGroup aria-label={groupLabel} className={`flex flex-col gap-3 ${className ?? ""}`} {...props}>
            {options.map((o) => (
                <AnswerOption key={o.value} {...o} />
            ))}
        </RadioGroup>
    );
}

export interface AnswerOptionProps extends AnswerOptionItem {
    className?: string;
}

export function AnswerOption({ value, label, isDisabled, className }: AnswerOptionProps) {
    return (
        <Radio
            value={value}
            isDisabled={isDisabled}
            className={[
                "group flex! w-full flex-row! items-center! justify-start! gap-3 text-left!",
                "cursor-pointer rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] px-3 py-3",
                "shadow-[3px_3px_0_0_#0A0A0A] transition-all",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                "data-[selected=true]:bg-[#FFDDD3]",
                "data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-[#FF4A1C]",
                "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 data-[disabled=true]:shadow-none",
                className ?? "",
            ].join(" ")}
        >
            {({ isSelected }) => (
                <>
                    <span
                        aria-hidden
                        className={[
                            "flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#0A0A0A]",
                            isSelected ? "bg-[#FF4A1C]" : "bg-white",
                        ].join(" ")}
                    >
                        {isSelected && <span className="size-2 rounded-full bg-[#0A0A0A]" />}
                    </span>
                    <span className="text-xs text-[#0A0A0A]">{label}</span>
                </>
            )}
        </Radio>
    );
}