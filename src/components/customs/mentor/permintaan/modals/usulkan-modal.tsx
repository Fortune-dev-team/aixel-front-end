"use client"

import * as React from "react"
import {
    Button,
    FieldError,
    Label,
    ListBox,
    Modal,
    Select,
    type Key,
} from "@heroui/react"
import type { JadwalSlotOption, PermintaanItem } from "../interfaces"

interface UsulkanJadwalModalProps {
    item: PermintaanItem | null
    slots: JadwalSlotOption[]
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (id: string, slotId: string) => Promise<boolean> | boolean
    isSubmitting?: boolean
}

export function UsulkanJadwalModal({
    item,
    slots,
    isOpen,
    onOpenChange,
    onSubmit,
    isSubmitting = false,
}: UsulkanJadwalModalProps) {
    const [selectedSlotId, setSelectedSlotId] = React.useState("")
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        if (isOpen) {
            setSelectedSlotId("")
            setError("")
        }
    }, [isOpen])

    const handleSelectionChange = (key: Key | null) => {
        setSelectedSlotId(key ? String(key) : "")
        if (error) setError("")
    }

    const handleConfirm = async () => {
        if (!item) return
        if (!selectedSlotId) {
            setError("Pilih jadwal pengganti terlebih dahulu.")
            return
        }
        setError("")
        const success = await onSubmit(item.id, selectedSlotId)
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
                                Usulkan Jadwal Lain
                            </Modal.Heading>
                            <p className="font-sans text-xs text-[#525252]">
                                Pilih waktu alternatif untuk sesi wawancara dengan{" "}
                                <span className="font-medium text-[#0A0A0A]">
                                    {item?.namaMentee}
                                </span>
                                .
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-0">
                            <Select
                                aria-label="Pilih Jadwal"
                                placeholder="Pilih slot jadwal..."
                                selectedKey={selectedSlotId || null}
                                onSelectionChange={handleSelectionChange}
                                isDisabled={isSubmitting}
                                isInvalid={Boolean(error)}
                                className="flex w-full flex-col gap-1.5"
                            >
                                <Label className="font-mono text-xs font-medium text-[#0A0A0A]">
                                    Pilih Jadwal
                                </Label>

                                <Select.Trigger className="flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus-visible:shadow-[2px_2px_0px_#FF5722]">
                                    <Select.Value className="truncate text-left data-[placeholder=true]:text-[#737373]" />
                                    <Select.Indicator className="size-3.5 shrink-0 text-[#0A0A0A]" />
                                </Select.Trigger>

                                <Select.Popover className="z-[60] min-w-[var(--trigger-width)] rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-1 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                                    <ListBox className="flex max-h-56 flex-col gap-0.5 overflow-y-auto outline-none">
                                        {slots.map((slot) => (
                                            <ListBox.Item
                                                key={slot.id}
                                                id={slot.id}
                                                textValue={slot.label}
                                                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-medium data-[selected=true]:text-[#FDFCFA]"
                                            >
                                                {slot.label}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>

                                {error && (
                                    <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {error}
                                    </FieldError>
                                )}
                            </Select>
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
                                className="h-8 cursor-pointer rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FF5722] px-3.5 font-mono text-xs font-medium text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px active:shadow-none"
                            >
                                {isSubmitting ? "Mengirim..." : "Usulkan Jadwal"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}