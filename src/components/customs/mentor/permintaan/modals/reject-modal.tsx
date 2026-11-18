"use client"

import * as React from "react"
import {
    Button,
    FieldError,
    Label,
    Modal,
    TextArea,
    TextField,
} from "@heroui/react"
import { X } from "lucide-react"
import type { PermintaanRow } from "../interfaces"

interface TolakPermintaanModalProps {
    target: PermintaanRow | null
    isOpen: boolean
    isSubmitting?: boolean
    onClose: () => void
    onSubmit: (id: string, reason: string) => void
}

export function TolakPermintaanModal({
    target,
    isOpen,
    isSubmitting = false,
    onClose,
    onSubmit,
}: TolakPermintaanModalProps) {
    const [reason, setReason] = React.useState("")
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        if (isOpen) {
            setReason("")
            setError("")
        }
    }, [isOpen, target?.id])

    const handleConfirm = () => {
        if (!target) return

        const trimmed = reason.trim()
        if (!trimmed) {
            setError("Keterangan wajib diisi.")
            return
        }

        onSubmit(target.id, trimmed)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
                <Modal.Container className="w-full max-w-lg">
                    <Modal.Dialog className="relative rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-6 text-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="mb-4 flex flex-row items-start justify-between gap-4">
                            <div>
                                <Modal.Heading className="font-mono text-sm font-bold text-[#0A0A0A]">
                                    Tolak permintaan wawancara · {target?.atribut ?? ""}
                                </Modal.Heading>
                                <p className="mt-1 font-sans text-xs leading-relaxed text-[#404040]">
                                    Alasan Anda akan dibaca team sebelum mempertimbangkan
                                    pengajuan berikutnya.
                                </p>
                            </div>

                            <Modal.CloseTrigger
                                onPress={onClose}
                                aria-label="Tutup modal"
                                className="cursor-pointer rounded-md p-1 text-[#0A0A0A] transition-colors hover:bg-[#EFEFEB]"
                            >
                                <X className="size-3.5" />
                            </Modal.CloseTrigger>
                        </Modal.Header>

                        <Modal.Body className="mb-5">
                            <TextField
                                isRequired
                                isInvalid={Boolean(error)}
                                value={reason}
                                onChange={(val) => {
                                    setReason(val)
                                    if (error) setError("")
                                }}
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="font-mono text-xs font-bold text-[#0A0A0A]">
                                    Keterangan <span className="text-[#DC2626]">*</span>
                                </Label>
                                <TextArea
                                    rows={4}
                                    placeholder="Tulis catatan Anda..."
                                    className="w-full resize-y rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-3 font-sans text-xs text-[#0A0A0A] placeholder:text-[#737373] focus:outline-none"
                                />
                                {error && (
                                    <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {error}
                                    </FieldError>
                                )}
                            </TextField>
                        </Modal.Body>

                        <Modal.Footer className="flex items-center justify-start gap-2.5">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                isDisabled={isSubmitting}
                                onPress={onClose}
                                className="h-auto cursor-pointer rounded-md border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3.5 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px active:shadow-none"
                            >
                                Batal
                            </Button>

                            <Button
                                type="button"
                                size="sm"
                                isDisabled={isSubmitting}
                                onPress={handleConfirm}
                                className="h-auto cursor-pointer rounded-md border-[1.5px] border-[#0A0A0A] bg-[#DC2626] px-3.5 py-1.5 font-mono text-xs font-bold text-[#FDFCFA] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-[#B91C1C] active:translate-x-px active:translate-y-px active:shadow-none"
                            >
                                {isSubmitting ? "Mengirim..." : "Kirim penolakan"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}