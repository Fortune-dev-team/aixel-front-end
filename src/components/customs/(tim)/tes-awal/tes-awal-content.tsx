"use client"

import { Button } from "@/components/ui/button"
import { TesAwalHeader } from "./widgets/tes-awal-header"
import { TesAwalTable } from "./tables/tes-awal-table"
import { useTesAwal } from "./use-tes-awal"

export function TesAwalContent() {
    const { data, handleUlangiTes } = useTesAwal()

    return (
        <div className="w-full">
            <TesAwalHeader />
            <TesAwalTable rows={data} />
            <div className="mt-6">
                <Button
                    variant="coral"
                    size="sm"
                    onPress={handleUlangiTes}
                    className="cursor-pointer text-[#0A0A0A]"
                >
                    Ulangi tes
                </Button>
            </div>
        </div>
    )
}
