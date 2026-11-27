"use client";

import * as React from "react";
import { INITIAL_OWNED_ATTRIBUTES, INITIAL_PROFILE_DATA } from "./constants";
import type {
    OwnedAttributeItem,
    ProfilToastState,
    TeamProfileForm,
} from "./interfaces";

export function useProfil() {
    const [formData, setFormData] =
        React.useState<TeamProfileForm>(INITIAL_PROFILE_DATA);
    const [errors, setErrors] = React.useState<
        Partial<Record<keyof TeamProfileForm, string>>
    >({});
    const [attributes] = React.useState<OwnedAttributeItem[]>(
        INITIAL_OWNED_ATTRIBUTES
    );
    const [toast, setToast] = React.useState<ProfilToastState | null>(null);

    React.useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(() => setToast(null), 4000);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const handleFieldChange = (field: keyof TeamProfileForm, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const submitForm = () => {
        const nextErrors: Partial<Record<keyof TeamProfileForm, string>> = {};
        if (!formData.name.trim()) {
            nextErrors.name = "Nama wajib diisi.";
        }
        if (
            !formData.email.trim() ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            nextErrors.email = "Format email tidak valid.";
        }
        if (!formData.projectNote.trim()) {
            nextErrors.projectNote = "Keterangan proyek wajib diisi.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setToast({
                type: "error",
                message: "Perubahan gagal tersimpan.",
            });
            return;
        }

        setErrors({});
        setToast({
            type: "success",
            message: "Perubahan berhasil tersimpan.",
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm();
    };

    return {
        formData,
        errors,
        attributes,
        toast,
        dismissToast: () => setToast(null),
        handleFieldChange,
        handleSubmit,
        submitForm,
    };
}