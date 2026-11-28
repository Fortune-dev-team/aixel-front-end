"use client";

import React from "react";

export interface TablePaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function TablePagination({
    page,
    totalPages,
    onPageChange,
}: TablePaginationProps) {
    const safeTotalPages = Math.max(1, totalPages);
    const currentPage = Math.min(Math.max(1, page), safeTotalPages);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= safeTotalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="flex justify-end items-center gap-2 pt-2">
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                    currentPage === 1
                        ? "bg-[#d4d4d8] text-zinc-600 cursor-not-allowed opacity-80"
                        : "bg-white text-black hover:bg-zinc-100 cursor-pointer"
                }`}
            >
                Sebelumnya
            </button>
            {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                            ? "bg-[#ff4a1c] text-white shadow-[2px_2px_0_0_#111111]"
                            : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                    {pageNum}
                </button>
            ))}
            <button
                type="button"
                disabled={currentPage === safeTotalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                    currentPage === safeTotalPages
                        ? "bg-[#d4d4d8] text-zinc-600 cursor-not-allowed opacity-80"
                        : "bg-white text-black hover:bg-zinc-100 cursor-pointer"
                }`}
            >
                Berikutnya
            </button>
        </div>
    );
}
