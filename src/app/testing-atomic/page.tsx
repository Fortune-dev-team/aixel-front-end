"use client";

import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Chip, ChipVariant } from "@/components/ui/Chip";
import { Avatar } from "@/components/ui/Avatar";
import { StepSegment } from "@/components/ui/StepSegment";

import { StepIndicator } from "@/components/ui/StepIndicator";
import { NotificationItem } from "@/components/ui/NotificationItem";
import { SessionItem } from "@/components/ui/SessionItem";
import { MenuItem } from "@/components/ui/MenuItem";
import { Toast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/ui/EmptyState";
import { TableHeader } from "@/components/ui/TableHeader";
import { TableRow } from "@/components/ui/TableRow";

import { DataTable, DataTableItem } from "@/components/ui/DataTable";
import { MentorInviteBanner } from "@/components/ui/MentorInviteBanner";

const chipVariants: ChipVariant[] = ["neutral", "amber", "coral", "red", "green", "blue"];

const tableItems: DataTableItem[] = [
    { id: 1, name: "Dimas Prakoso", attribute: "Komunikasi", status: "Aktif", statusVariant: "green" },
    { id: 2, name: "Sari Wulandari", attribute: "Kepemimpinan", status: "Menunggu", statusVariant: "amber" },
    { id: 3, name: "Budi Santoso", attribute: "Analitik", status: "Nonaktif", statusVariant: "red" },
];

const Section = ({ title, level, children }: { title: string; level: string; children: ReactNode }) => (
    <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b-2 border-black pb-2">
            <h2 className="font-mono text-lg font-bold">{title}</h2>
            <Chip variant="neutral">{level}</Chip>
        </div>
        {children}
    </section>
);

export default function ComponentsTestPage() {
    const [step, setStep] = useState(3);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Teks lorem ipsum lorem ipsum lorem", time: "5 menit", unread: true },
        { id: 2, text: "Teks lorem ipsum lorem ipsum lorem", time: "5 menit", unread: false },
    ]);
    const [toasts, setToasts] = useState<{ id: number; type: "success" | "error"; message: string }[]>([]);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [showEmptyTable, setShowEmptyTable] = useState(false);
    const [invite, setInvite] = useState<string | null>(null);

    const pushToast = (type: "success" | "error", message: string) =>
        setToasts((t) => [...t, { id: Date.now(), type, message }]);

    return (
        <main className="mx-auto flex max-w-4xl flex-col gap-12 bg-[#fdfcf9] p-8 text-black">
            <h1 className="font-mono text-2xl font-black">Component test page</h1>

            {/* ui */}
            <Section title="Chip" level="Atom">
                <div className="flex flex-wrap gap-3">
                    {chipVariants.map((v) => (
                        <Chip key={v} variant={v}>
                            {v}
                        </Chip>
                    ))}
                </div>
            </Section>

            <Section title="Avatar" level="Atom">
                <div className="flex items-center gap-3">
                    <Avatar initials="AB" size="sm" />
                    <Avatar initials="CD" size="md" />
                    <Avatar initials="EF" size="lg" />
                </div>
            </Section>

            <Section title="StepSegment" level="Atom">
                <div className="flex w-48 flex-col gap-2">
                    <StepSegment filled />
                    <StepSegment />
                </div>
            </Section>

            {/* ui */}
            <Section title="StepIndicator" level="Molecule">
                <div className="flex flex-col gap-3">
                    <StepIndicator total={7} current={step} />
                    <div className="flex gap-2">
                        <Button variant="white" size="sm" onPress={() => setStep((s) => Math.max(1, s - 1))}>
                            Prev
                        </Button>
                        <Button variant="black" size="sm" onPress={() => setStep((s) => Math.min(7, s + 1))}>
                            Next
                        </Button>
                        <span className="self-center font-mono text-xs">
                            {step} / 7
                        </span>
                    </div>
                </div>
            </Section>

            <Section title="NotificationItem" level="Molecule">
                <div className="flex flex-col gap-3">
                    {notifications.map((n) => (
                        <NotificationItem
                            key={n.id}
                            text={n.text}
                            time={n.time}
                            unread={n.unread}
                            onDismiss={() => setNotifications((list) => list.filter((x) => x.id !== n.id))}
                        />
                    ))}
                    {notifications.length === 0 && (
                        <Button
                            variant="white"
                            size="sm"
                            onPress={() =>
                                setNotifications([
                                    { id: 1, text: "Teks lorem ipsum lorem ipsum lorem", time: "5 menit", unread: true },
                                    { id: 2, text: "Teks lorem ipsum lorem ipsum lorem", time: "5 menit", unread: false },
                                ])
                            }
                        >
                            Reset
                        </Button>
                    )}
                </div>
            </Section>

            <Section title="SessionItem" level="Molecule">
                <SessionItem
                    initials="AB"
                    title="Judul sesi"
                    subtitle="Jadwal"
                    onAction={() => pushToast("success", "Sesi dibatalkan")}
                />
            </Section>

            <Section title="MenuItem" level="Molecule">
              <div className="flex w-56 flex-col gap-3">
                  <MenuItem icon="◈" label="Dashboard" state="default" />
                  <MenuItem icon="◈" label="Dashboard (hover)" state="hover" />
                  <MenuItem icon="◈" label="Dashboard (active)" state="active" />
                  <hr className="border-black/20" />
                  {["dashboard", "sesi", "mentor"].map((key) => (
                      <MenuItem
                          key={key}
                          icon="◈"
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          state={activeMenu === key ? "active" : "default"}
                          onClick={() => setActiveMenu(key)}
                      />
                  ))}
              </div>
          </Section>

            <Section title="Toast" level="Molecule">
                <div className="flex flex-col gap-4">
                    <Toast type="success" message="Teks" />
                    <Toast type="error" message="Teks" />
                    <div className="flex gap-2">
                        <Button variant="green" size="sm" onPress={() => pushToast("success", "Berhasil disimpan")}>
                            Trigger success
                        </Button>
                        <Button variant="red" size="sm" onPress={() => pushToast("error", "Gagal menyimpan")}>
                            Trigger error
                        </Button>
                    </div>
                    {toasts.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {toasts.map((t) => (
                                <Toast
                                    key={t.id}
                                    type={t.type}
                                    message={t.message}
                                    onClose={() => setToasts((list) => list.filter((x) => x.id !== t.id))}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Section>

            <Section title="EmptyState" level="Molecule">
                <EmptyState actionLabel="Button" onAction={() => pushToast("success", "Action clicked")} />
            </Section>

            <Section title="TableHeader + TableRow" level="Molecule">
                <div className="overflow-hidden border-2 border-black">
                    <TableHeader columns={["Nama", "Atribut", "Status", "Aksi"]} />
                    <TableRow name="Dimas Prakoso" attribute="Komunikasi" status="Aktif" />
                    <TableRow name="Dimas Prakoso" attribute="Komunikasi" status="Aktif" striped />
                </div>
            </Section>

            {/* ORGANISMS */}
            <Section title="DataTable" level="Organism">
                <div className="flex flex-col gap-3">
                    <Button variant="white" size="sm" className="self-start" onPress={() => setShowEmptyTable((v) => !v)}>
                        {showEmptyTable ? "Show data" : "Show empty"}
                    </Button>
                    <DataTable
                        items={showEmptyTable ? [] : tableItems}
                        emptyActionLabel="Tambah data"
                        onEmptyAction={() => setShowEmptyTable(false)}
                        onRowAction={(item) => pushToast("success", `Detail: ${item.name}`)}
                    />
                </div>
            </Section>

            <Section title="MentorInviteBanner" level="Organism">
                <MentorInviteBanner
                    description="Admin menunjuk Anda untuk mentor Komunikasi"
                    onAccept={() => setInvite("Bersedia")}
                    onDecline={() => setInvite("Tidak bersedia")}
                />
                {invite && <p className="font-mono text-xs">Response: {invite}</p>}
            </Section>
        </main>
    );
}
