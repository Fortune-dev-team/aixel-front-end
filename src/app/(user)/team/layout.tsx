import { TeamShell } from "@/components/layout/team/team-shell"

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <TeamShell>{children}</TeamShell>
}