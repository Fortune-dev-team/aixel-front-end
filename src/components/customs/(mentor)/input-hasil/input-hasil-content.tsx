"use client"

import { EmptySesiCard } from "./cards/empty-card"
import { InputHasilFormCard } from "./cards/input-card"
import type { InputHasilContentProps } from "./interfaces"
import { useInputHasil } from "./use-input-hasil"
import { InputHasilHeader } from "./widgets/header"

export function InputHasilContent({
    initialCandidates,
    onSubmitPenilaian,
}: InputHasilContentProps) {
    const {
        viewState,
        setViewState,
        candidates,
        values,
        errors,
        isSubmitting,
        handleFieldChange,
        handleSubmit,
    } = useInputHasil({
        initialCandidates,
        onSubmitPenilaian,
    })

    return (
        <div className="w-full">
            <InputHasilHeader
                viewState={viewState}
                onViewStateChange={setViewState}
            />

            {candidates.length === 0 ? (
                <EmptySesiCard />
            ) : (
                <InputHasilFormCard
                    candidates={candidates}
                    values={values}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    onFieldChange={handleFieldChange}
                    onSubmit={handleSubmit}
                />
            )}

        </div>
    )
}