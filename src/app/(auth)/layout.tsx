import AuthNavbar from "@/components/layout/auth/auth-navbar";
import "../globals.css"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthNavbar />
            {children}
        </>
    );
}