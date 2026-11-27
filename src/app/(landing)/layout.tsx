import  Navbar  from "@/components/layout/user/main-navbar";
import  Footer  from "@/components/layout/user/main-footer";

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh flex-col bg-[#ece9e2] text-[#111111]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}