import { SCHEDULE_ITEMS } from "./constants";
import { ScheduleCard } from "./cards/schedule-card";
import { ScheduleHeader } from "./widgets/schedule-header";

export function ScheduleContent() {
    return (
        <div className="w-full">
            <ScheduleHeader />

            <div className="space-y-4">
                {SCHEDULE_ITEMS.map((item) => (
                    <ScheduleCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}