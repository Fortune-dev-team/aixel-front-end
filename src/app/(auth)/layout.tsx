import AuthNavbar from "@/components/layout/auth/auth-navbar";
import "../globals.css"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-[#ece9e2]">
            <AuthNavbar />
            {children}
        </div>
    )
}