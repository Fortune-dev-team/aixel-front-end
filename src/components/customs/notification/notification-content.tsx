"use client"

import { TandaiDibacaButton } from "./buttons/mark-read"
import { EmptyNotifikasiCard } from "./cards/empty-card"
import { NotifikasiItemCard } from "./cards/notification-item-card"
import type { NotifikasiContentProps } from "./interfaces"
import { useNotifikasi } from "./use-notification"
import { NotifikasiHeader } from "./widgets/header"

export function NotificationContent({
    initialItems,
    isLoading = false,
    onDismissItem,
    onMarkAllRead,
}: NotifikasiContentProps) {
    const {
        items,
        viewState,
        setViewState,
        isProcessing,
        handleDismiss,
        handleMarkAllRead,
    } = useNotifikasi({
        initialItems,
        onDismissItem,
        onMarkAllRead,
    })

    return (
        <div className="w-full">
            <NotifikasiHeader
                viewState={viewState}
                onViewStateChange={setViewState}
            />

            {!isLoading && items.length === 0 ? (
                <EmptyNotifikasiCard />
            ) : (
                <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full flex-col gap-2.5">
                        {items.map((item) => (
                            <NotifikasiItemCard
                                key={item.id}
                                item={item}
                                isDisabled={isProcessing}
                                onDismiss={handleDismiss}
                            />
                        ))}
                    </div>

                    <div>
                        <TandaiDibacaButton
                            isLoading={isProcessing}
                            onPress={handleMarkAllRead}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}