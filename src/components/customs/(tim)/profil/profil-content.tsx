"use client";

import { ProfilFormCard } from "./cards/profil-form-card";
import { OwnedAttributesTable } from "./tables/owned-attributes-table";
import { useProfil } from "./use-profil";
import { ProfilHeader } from "./widgets/profil-header";
import { ProfilToast } from "./widgets/profil-toast";

export function ProfilContent() {
    const {
        formData,
        errors,
        attributes,
        toast,
        dismissToast,
        handleFieldChange,
        handleSubmit,
        submitForm,
    } = useProfil();

    return (
        <div className="w-full">
            <ProfilHeader />

            <ProfilFormCard
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
                onSave={submitForm}
            />

            <OwnedAttributesTable data={attributes} />

            <ProfilToast toast={toast} onClose={dismissToast} />
        </div>
    );
}