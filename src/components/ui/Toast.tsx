"use client"

import * as React from "react"
import { Toast } from "@heroui/react"
import { AlertTriangle, Check, X } from "lucide-react"

type CustomToastProps = React.ComponentProps<typeof Toast>

export function CustomToast({ toast, ...props }: CustomToastProps) {
    const content = toast.content as {
        title?: React.ReactNode
        variant?: "default" | "accent" | "success" | "warning" | "danger"
    }
    const isDanger = content.variant === "danger"

    return (
        <Toast
            toast={toast}
            {...props}
            className="flex ml-auto w-full max-w-sm items-center justify-between gap-4 rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] px-3.5 py-2.5 text-[#FDFCFA] shadow-[3px_3px_0px_#FF5722] outline-none"
        >
            <Toast.Content className="flex flex-none flex-row items-center gap-2.5">
                {isDanger ? (
                    <AlertTriangle className="size-4 shrink-0 text-[#EF4444]" />
                ) : (
                    <Check className="size-4 shrink-0 text-[#22C55E]" />
                )}
                <Toast.Title className="font-mono text-xs font-medium text-[#FDFCFA]">
                    {content.title}
                </Toast.Title>
            </Toast.Content>

            <Toast.CloseButton
                aria-label="Tutup notifikasi"
                className="cursor-pointer rounded bg-[#0A0A0A] border-[#FF5722] p-0.5 text-[#FF5722]/80 transition-colors hover:text-[#FF5722]"
            >
                <X className="size-3.5" />
            </Toast.CloseButton>
        </Toast>
    )
}