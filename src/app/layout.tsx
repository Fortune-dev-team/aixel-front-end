import Navbar from "@/components/layout/user/main-navbar";
import Footer from "@/components/layout/user/main-footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}