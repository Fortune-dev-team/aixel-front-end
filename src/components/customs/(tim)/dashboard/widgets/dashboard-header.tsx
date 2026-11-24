import { DemoStateTabs } from "../buttons/demo-state-tabs"
import type { DashboardDemoState } from "../interfaces"

interface DashboardHeaderProps {
    userName?: string
    demoState: DashboardDemoState
    onDemoStateChange: (state: DashboardDemoState) => void
}

export function DashboardHeader({
    userName = "Alex",
    demoState,
    onDemoStateChange,
}: DashboardHeaderProps) {
    return (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
                    Halo, {userName}
                </h1>
                <p className="mt-1 font-sans text-xs text-[#404040] sm:text-sm">
                    Ringkasan belajar Anda.
                </p>
            </div>

            {/* Hapus saat sudah integrasi API */}
            <DemoStateTabs value={demoState} onChange={onDemoStateChange} />
        </div>
    )
}