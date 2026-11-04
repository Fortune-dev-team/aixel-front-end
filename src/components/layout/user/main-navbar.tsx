"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Tentang", href: "#tentang" },
];

export default function Navbar() {
    return (
        <nav
            className="mx-auto flex py-3 w-full  items-center justify-between border-b-1 border-black/80 bg-white px-4 sm:px-6"
        >
            <Link
                href="/"
                className="flex items-center gap-2"
            >
                <Image
                    src="/assets/icon/logo-dark.svg"
                    alt="Aixel Logo"
                    width={24}
                    height={24}
                />
                <span className="font-mono text-lg font-bold  text-[#111111]">
                    Aixel
                </span>
            </Link>

            <div className="flex items-center gap-5">
                <ul className="hidden items-center gap-5 md:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-xs font-sans text-[#111111] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4a1c]"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <Link
                        href="/masuk"
                        className="rounded-md border-2 border-[#111111] bg-white px-3 py-0.5 font-mono text-sm font-bold text-[#111111] shadow-[2px_2px_0_0_#111111] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4a1c]"
                    >
                        Masuk
                    </Link>
                    <Link
                        href="/daftar"
                        className="rounded-md border-2 border-[#111111] bg-[#ff4a1c] px-3 py-0.5 font-mono text-sm font-bold text-[#111111] shadow-[2px_2px_0_0_#111111] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                    >
                        Daftar
                    </Link>
                </div>
            </div>
        </nav>
    );
}