"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import type { TeamProfileForm } from "../interfaces";

interface ProfilFormCardProps {
    formData: TeamProfileForm;
    errors: Partial<Record<keyof TeamProfileForm, string>>;
    onChange: (field: keyof TeamProfileForm, value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onSave: () => void;
}

export function ProfilFormCard({
    formData,
    errors,
    onChange,
    onSubmit,
    onSave,
}: ProfilFormCardProps) {
    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="w-full max-w-xl rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]"
        >
            <div className="space-y-4">
                <FormField label="Nama" htmlFor="profil-name" error={errors.name}>
                    <Input
                        id="profil-name"
                        type="text"
                        size="sm"
                        value={formData.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        className="bg-white"
                    />
                </FormField>

                <FormField label="Email" htmlFor="profil-email" error={errors.email}>
                    <Input
                        id="profil-email"
                        type="email"
                        size="sm"
                        value={formData.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="nama@email.com"
                        className="bg-white"
                    />
                </FormField>

                <FormField
                    label="Keterangan proyek"
                    htmlFor="profil-project-note"
                    error={errors.projectNote}
                >
                    <Input
                        id="profil-project-note"
                        type="text"
                        size="sm"
                        value={formData.projectNote}
                        onChange={(e) => onChange("projectNote", e.target.value)}
                        placeholder="Peran · Nama perusahaan atau proyek"
                        className="bg-white"
                    />
                </FormField>
            </div>

            <div className="mt-5">
                <Button variant="coral" size="sm" onPress={onSave}>
                    Simpan perubahan
                </Button>
            </div>
        </form>
    );
}