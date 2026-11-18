"use client"

import { Tabs } from "@heroui/react"
import { cn } from "@/lib/utils"
import { PERMINTAAN_DEMO_OPTIONS } from "../constants"
import type { PermintaanDemoState } from "../interfaces"

interface DemoStateTabsProps {
    value: PermintaanDemoState
    onChange: (value: PermintaanDemoState) => void
}

export function DemoStateTabs({ value, onChange }: DemoStateTabsProps) {
    return (
        <Tabs
            selectedKey={value}
            onSelectionChange={(key) => onChange(key as PermintaanDemoState)}
            aria-label="Preview state permintaan"
        >
            <Tabs.ListContainer>
                <Tabs.List className="inline-flex items-center gap-1 rounded-lg border border-[#0A0A0A]/30 bg-[#FDFCFA] p-1">
                    {PERMINTAAN_DEMO_OPTIONS.map((tab) => {
                        const isSelected = value === tab.id

                        return (
                            <Tabs.Tab
                                key={tab.id}
                                id={tab.id}
                                className={cn(
                                    "cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors outline-none",
                                    isSelected
                                        ? "bg-[#0A0A0A] text-[#FDFCFA]"
                                        : "text-[#404040] hover:bg-[#EFEFEB]"
                                )}
                            >
                                {tab.label}
                            </Tabs.Tab>
                        )
                    })}
                </Tabs.List>
            </Tabs.ListContainer>
        </Tabs>
    )
}