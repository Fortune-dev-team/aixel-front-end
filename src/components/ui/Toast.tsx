"use client";
// molecules/Toast.tsx

export type ToastType = "success" | "error";

export interface ToastProps {
    type?: ToastType;
    message: string;
    onClose?: () => void;
    className?: string;
}

export const Toast = ({ type = "success", message, onClose, className = "" }: ToastProps) => (
    <div
        role={type === "error" ? "alert" : "status"}
        className={`flex items-center gap-3 rounded-xl border-2 border-black bg-[#0d0d0d] px-4 py-3 text-white shadow-[4px_4px_0px_0px_#ff4d2d] ${className}`}
    >
        {type === "success" ? "V" : "X"}
        <p className="flex-1 text-sm">{message}</p>
        <button type="button" aria-label="Tutup" onClick={onClose} className="shrink-0 hover:opacity-70">
            X
        </button>
    </div>
);
