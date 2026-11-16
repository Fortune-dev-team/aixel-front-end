"use client";

import Image from "next/image";
import Link from "next/link";

export default function AuthNavbar() {
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

        </nav>
    );
}