import Link from "next/link";
import Checkers from "@/components/customs/landing-page/chekers/chekers";
import Image from "next/image";

const pixels = [1, 0, 1, 0, 2, 0, 1, 0, 1];

export default function Footer() {
    return (
        <footer className="w-full pt-10">
            <Checkers />

            <div className="mx-auto w-full px-6 pt-10 pb-8 sm:px-10 bg-[#0a0a0a]">
                <div className="flex flex-col justify-between gap-8 sm:flex-row">
                    <Link
                        href="/"
                        className="flex h-fit items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4a1c]"
                    >
                        <Image
                            src="/assets/icon/logo-white.svg"
                            alt="Aixel Logo"
                            width={28}
                            height={28}
                        />
                        <span className="font-mono text-lg font-bold tracking-tight text-[#f7f6f2]">
                            Aixel
                        </span>
                    </Link>

                    <div className="flex flex-col gap-3 sm:items-start">
                        <span className="font-mono text-sm text-[#6b6b6b]">
                            Contact us
                        </span>
                        <div className="flex flex-col gap-1">
                            <a
                                href="tel:012345678910"
                                className="text-sm text-[#d4d4d4] transition-opacity hover:opacity-60"
                            >
                                012345678910
                            </a>
                            <a
                                href="mailto:help@logoipsum.com"
                                className="text-sm text-[#d4d4d4] transition-opacity hover:opacity-60"
                            >
                                help@logoipsum.com
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="mt-10 border-t border-[#2a2a2a]" />
                <p className="mt-6 text-[9px] text-[#d4d4d4]">© 2026 Aixel</p>
            </div>
        </footer>
    );
}