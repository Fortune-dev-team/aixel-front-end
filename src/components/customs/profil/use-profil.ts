"use client";

import * as React from "react";
import { INITIAL_OWNED_ATTRIBUTES, INITIAL_TEAM_PROFILE } from "./constants";
import type {
    OwnedAttributeItem,
    ProfilToastState,
    TeamProfileData,
} from "./interfaces";

export function useProfil() {
    const [profile, setProfile] = React.useState<TeamProfileData>(
        INITIAL_TEAM_PROFILE
    );
    const [ownedAttributes] = React.useState<OwnedAttributeItem[]>(
        INITIAL_OWNED_ATTRIBUTES
    );
    const [toast, setToast] = React.useState<ProfilToastState | null>(null);

    const showToast = React.useCallback(
        (type: "success" | "error", message: string) => {
            setToast({ id: Date.now(), type, message });
        },
        []
    );

    const dismissToast = React.useCallback(() => {
        setToast(null);
    }, []);

    const handleSaveProfile = (updated: TeamProfileData) => {
        const trimmedName = updated.name.trim();
        const trimmedEmail = updated.email.trim();

        if (!trimmedName || !trimmedEmail || !trimmedEmail.includes("@")) {
            showToast("error", "Perubahan gagal tersimpan.");
            return;
        }

        setProfile({
            name: trimmedName,
            email: trimmedEmail,
            projectDescription: updated.projectDescription.trim(),
        });
        showToast("success", "Perubahan berhasil tersimpan.");
    };

    return {
        profile,
        ownedAttributes,
        toast,
        dismissToast,
        handleSaveProfile,
    };
}