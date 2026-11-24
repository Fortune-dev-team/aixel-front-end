"use client";

import Link from "next/link";

interface CourseHeaderProps {
    title: string;
    subtitle: string;
    backHref?: string;
    onBack?: () => void;
}

export function CourseHeader({
    title,
    subtitle,
    backHref,
    onBack,
}: CourseHeaderProps) {
    return (
        <div className="mb-6 flex items-start gap-3">
            {(backHref || onBack) &&
                (backHref ? (
                    <Link
                        href={backHref}
                        aria-label="Kembali"
                        className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border-2 border-[#0A0A0A] bg-[#FDFCFA] text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] transition-colors hover:bg-[#EFEFEB]"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label="Kembali"
                        className="mt-0.5 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-[#0A0A0A] bg-[#FDFCFA] text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] transition-colors hover:bg-[#EFEFEB]"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                ))}

            <div>
                <h1 className="font-heading text-xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-2xl">
                    {title}
                </h1>
                <p className="mt-1 font-sans text-xs text-[#404040] sm:text-sm">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}