"use client"

import { Card, Separator } from "@heroui/react"
import { KirimPenilaianButton } from "../buttons/button"
import { RUBRIK_SKOR_OPTIONS } from "../constants"
import { CatatanTextarea } from "../inputs/textarea"
import { HeroSelectField } from "../inputs/select"
import { KeputusanRadioGroup } from "../inputs/radio-group"
import type {
    InputHasilFormErrors,
    InputHasilFormValues,
    KandidatSesi,
} from "../interfaces"

interface InputHasilFormCardProps {
    candidates: KandidatSesi[]
    values: InputHasilFormValues
    errors: InputHasilFormErrors
    isSubmitting?: boolean
    onFieldChange: <K extends keyof InputHasilFormValues>(
        field: K,
        value: InputHasilFormValues[K]
    ) => void
    onSubmit: () => void
}

export function InputHasilFormCard({
    candidates,
    values,
    errors,
    isSubmitting = false,
    onFieldChange,
    onSubmit,
}: InputHasilFormCardProps) {
    const kandidatOptions = candidates.map((item) => ({
        id: item.id,
        label: item.nama,
    }))

    return (
        <Card className="w-full max-w-md rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-6 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A]">
            <Card.Content className="flex flex-col gap-4 p-0">
                <HeroSelectField
                    label="Kandidat"
                    options={kandidatOptions}
                    value={values.kandidatId}
                    onChange={(val) => onFieldChange("kandidatId", val)}
                    errorMessage={errors.kandidatId}
                    isDisabled={isSubmitting}
                />

                <HeroSelectField
                    label="Pemahaman konsep"
                    options={RUBRIK_SKOR_OPTIONS}
                    value={values.pemahamanKonsep}
                    onChange={(val) => onFieldChange("pemahamanKonsep", val)}
                    errorMessage={errors.pemahamanKonsep}
                    isDisabled={isSubmitting}
                />

                <HeroSelectField
                    label="Ketepatan penerapan"
                    options={RUBRIK_SKOR_OPTIONS}
                    value={values.ketepatanPenerapan}
                    onChange={(val) => onFieldChange("ketepatanPenerapan", val)}
                    errorMessage={errors.ketepatanPenerapan}
                    isDisabled={isSubmitting}
                />

                <HeroSelectField
                    label="Komunikasi alasan"
                    options={RUBRIK_SKOR_OPTIONS}
                    value={values.komunikasiAlasan}
                    onChange={(val) => onFieldChange("komunikasiAlasan", val)}
                    errorMessage={errors.komunikasiAlasan}
                    isDisabled={isSubmitting}
                />

                <HeroSelectField
                    label="Refleksi dan tindak lanjut"
                    options={RUBRIK_SKOR_OPTIONS}
                    value={values.refleksiTindakLanjut}
                    onChange={(val) => onFieldChange("refleksiTindakLanjut", val)}
                    errorMessage={errors.refleksiTindakLanjut}
                    isDisabled={isSubmitting}
                />

                <CatatanTextarea
                    value={values.catatan}
                    onChange={(val) => onFieldChange("catatan", val)}
                    errorMessage={errors.catatan}
                    isDisabled={isSubmitting}
                />

                <Separator className="my-1 bg-[#0A0A0A]/30" />

                <KeputusanRadioGroup
                    value={values.keputusan}
                    onChange={(val) => onFieldChange("keputusan", val)}
                    errorMessage={errors.keputusan}
                    isDisabled={isSubmitting}
                />
            </Card.Content>

            <Card.Footer className="mt-4 flex justify-start p-0">
                <KirimPenilaianButton
                    isLoading={isSubmitting}
                    onPress={onSubmit}
                />
            </Card.Footer>
        </Card>
    )
}