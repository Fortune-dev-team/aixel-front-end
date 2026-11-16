"use client";

import { Card, Input, Label, TextField } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { ROLE_OPTIONS } from "../constants";
import { StepNavigation } from "../buttons/step-navigation";
import type { OnboardingProfile } from "../interfaces";

interface ProfileFormProps {
    profile: OnboardingProfile;
    onChange: (updated: OnboardingProfile) => void;
    canProceed: boolean;
    onNext: () => void;
}

export function ProfileForm({
    profile,
    onChange,
    canProceed,
    onNext,
}: ProfileFormProps) {
    return (
        <>
            <Card.Header className="flex flex-col items-start gap-1 p-0 pb-6">
                <Card.Title className="font-mono text-2xl font-bold tracking-tight text-black">
                    Profil Anda
                </Card.Title>
                <p className="text-xs text-neutral-600">
                    Lengkapi informasi dasar agar pemetaan kompetensi lebih relevan.
                </p>
            </Card.Header>

            <Card.Content className="flex flex-col gap-4 p-0">
                <TextField
                    value={profile.fullName}
                    onChange={(fullName) => onChange({ ...profile, fullName })}
                    className="flex flex-col gap-1.5"
                    isRequired
                >
                    <Label className="font-mono text-xs font-bold text-black">
                        Nama lengkap
                    </Label>
                    <Input
                        placeholder="Masukkan nama lengkap"
                        className="h-10 w-full rounded-lg border-[1.5px] border-black bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    />
                </TextField>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="role-select"
                        className="font-mono text-xs font-bold text-black"
                    >
                        Role
                    </label>
                    <div className="relative">
                        <select
                            id="role-select"
                            value={profile.role}
                            onChange={(e) => onChange({ ...profile, role: e.target.value })}
                            className="h-10 w-full appearance-none rounded-lg border-[1.5px] border-black bg-white px-3 pr-9 text-sm text-black focus:outline-2 focus:outline-offset-2 focus:outline-black"
                        >
                            <option value="" disabled>
                                Pilih pekerjaan
                            </option>
                            {ROLE_OPTIONS.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
                        />
                    </div>
                </div>

                <TextField
                    value={profile.bio}
                    onChange={(bio) => onChange({ ...profile, bio })}
                    className="flex flex-col gap-1.5"
                >
                    <Label className="font-mono text-xs font-bold text-black">
                        Bio singkat
                    </Label>
                    <Input
                        placeholder="Ceritakan singkat fokus kerja Anda"
                        className="h-10 w-full rounded-lg border-[1.5px] border-black bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    />
                </TextField>

                <StepNavigation isNextDisabled={!canProceed} onNext={onNext} />
            </Card.Content>
        </>
    );
}