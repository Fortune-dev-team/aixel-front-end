"use client";

import * as React from "react";
import { toast } from "@heroui/react";
import { INITIAL_OWNED_ATTRIBUTES, INITIAL_PROFILE_DATA } from "./constants";
import type { OwnedAttributeItem, TeamProfileForm } from "./interfaces";

export function useProfil() {
    const [formData, setFormData] =
        React.useState<TeamProfileForm>(INITIAL_PROFILE_DATA);
    const [errors, setErrors] = React.useState<
        Partial<Record<keyof TeamProfileForm, string>>
    >({});
    const [attributes] = React.useState<OwnedAttributeItem[]>(
        INITIAL_OWNED_ATTRIBUTES
    );

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
            toast.danger("Perubahan gagal tersimpan.", {
                description: "Periksa kembali data profil yang masih kosong atau tidak valid.",
            });
            return;
        }

        setErrors({});
        toast.success("Perubahan berhasil tersimpan.", {
            description: "Data profil tim telah diperbarui.",
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
        handleFieldChange,
        handleSubmit,
        submitForm,
    };
}