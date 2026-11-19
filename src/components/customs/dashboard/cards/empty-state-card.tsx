"use client"

import { Card } from "@heroui/react"
import { Button } from "@/components/ui/button"

interface EmptyStateCardProps {
    message: string
    actionLabel?: string
    onAction?: () => void
}

export function EmptyStateCard({
    message,
    actionLabel,
    onAction,
}: EmptyStateCardProps) {
    return (
        <Card className="w-full rounded-xl border-2 border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA]/60 shadow-none">
            <Card.Content className="flex flex-col items-center justify-center px-4 py-8 text-center">
                <p className="font-sans text-xs text-[#525252]">{message}</p>

                {actionLabel && onAction && (
                    <Button
                        variant="coral"
                        size="sm"
                        onPress={onAction}
                        className="mt-3 cursor-pointer !text-[#0A0A0A]"
                    >
                        {actionLabel}
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}