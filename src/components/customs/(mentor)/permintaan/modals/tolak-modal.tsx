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
import type { PermintaanItem } from "../interfaces"

interface TolakPermintaanModalProps {
    item: PermintaanItem | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (id: string, alasan: string) => Promise<boolean> | boolean
    isSubmitting?: boolean
}

export function TolakPermintaanModal({
    item,
    isOpen,
    onOpenChange,
    onSubmit,
    isSubmitting = false,
}: TolakPermintaanModalProps) {
    const [alasan, setAlasan] = React.useState("")
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        if (isOpen) {
            setAlasan("")
            setError("")
        }
    }, [isOpen])

    const handleConfirm = async () => {
        if (!item) return
        if (!alasan.trim()) {
            setError("Alasan penolakan wajib diisi.")
            return
        }
        setError("")
        const success = await onSubmit(item.id, alasan.trim())
        if (success) {
            onOpenChange(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-md">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="mb-3 flex flex-col gap-1 p-0">
                            <Modal.Heading className="font-heading text-base font-extrabold text-[#0A0A0A]">
                                Tolak Permintaan
                            </Modal.Heading>
                            <p className="font-sans text-xs text-[#525252]">
                                Berikan alasan penolakan untuk{" "}
                                <span className="font-medium text-[#0A0A0A]">
                                    {item?.namaMentee}
                                </span>
                                .
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-0">
                            <TextField
                                value={alasan}
                                onChange={(val) => {
                                    setAlasan(val)
                                    if (error) setError("")
                                }}
                                isInvalid={Boolean(error)}
                                isDisabled={isSubmitting}
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="font-mono text-xs font-medium text-[#0A0A0A]">
                                    Alasan
                                </Label>
                                <TextArea
                                    rows={3}
                                    placeholder="Tulis alasan penolakan jadwal..."
                                    className="w-full resize-none rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-2.5 font-sans text-xs text-[#0A0A0A] outline-none placeholder:text-[#737373] focus-visible:shadow-[2px_2px_0px_#FF5722]"
                                />
                                {error && (
                                    <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {error}
                                    </FieldError>
                                )}
                            </TextField>
                        </Modal.Body>

                        <Modal.Footer className="mt-4 flex flex-row items-center justify-end gap-2 p-0">
                            <Button
                                type="button"
                                size="sm"
                                isDisabled={isSubmitting}
                                onPress={() => onOpenChange(false)}
                                className="h-8 cursor-pointer rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-mono text-xs font-medium text-[#0A0A0A] hover:bg-[#EFEFEB]"
                            >
                                Batal
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                isDisabled={isSubmitting}
                                onPress={handleConfirm}
                                className="h-8 cursor-pointer rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#DC2626] px-3.5 font-mono text-xs font-medium text-[#FDFCFA] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px active:shadow-none"
                            >
                                {isSubmitting ? "Mengirim..." : "Tolak Permintaan"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}