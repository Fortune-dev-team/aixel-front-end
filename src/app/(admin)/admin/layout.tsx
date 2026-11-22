import AppSidebar from "@/components/layout/admin/app-sidebar";
import AdminHeader from "@/components/layout/admin/admin-header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#faf8f5] text-black">
            {/* Sidebar (Desktop static aside + Mobile HeroUI drawer) */}
            <AppSidebar variant="responsive" />

            {/* Main Area with Admin Header */}
            <div className="flex flex-1 flex-col min-w-0">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
