import { DemoStateTabs } from "../buttons/demo-state-tabs"
import type { PermintaanDemoState } from "../interfaces"

interface PermintaanHeaderProps {
    demoState: PermintaanDemoState
    onDemoStateChange: (state: PermintaanDemoState) => void
}

export function PermintaanHeader({
    demoState,
    onDemoStateChange,
}: PermintaanHeaderProps) {
    return (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
                    Permintaan
                </h1>
                <p className="mt-1 font-sans text-xs text-[#404040] sm:text-sm">
                    Pengajuan wawancara yang masuk. Terima untuk menyetujui atau tolak
                    jika tidak tersedia.
                </p>
            </div>

            {/* Hapus saat sudah integrasi API */}
            <DemoStateTabs value={demoState} onChange={onDemoStateChange} />
        </div>
    )
}