// "use client";

// import * as React from "react";
// import { CustomToast } from "@/components/ui/Toast";
// import type { HasilToastState } from "../interfaces";

// interface HasilToastProps {
//     toast: HasilToastState | null;
//     onDismiss: () => void;
// }

// export function HasilToast({ toast, onDismiss }: HasilToastProps) {
//     React.useEffect(() => {
//         if (!toast) return;
//         const timer = window.setTimeout(onDismiss, 3500);
//         return () => window.clearTimeout(timer);
//     }, [toast, onDismiss]);

//     if (!toast) return null;

//     return (
//         <CustomToast
//             type={toast.type}
//             message={toast.message}
//             onClose={onDismiss}
//             className="fixed right-5 bottom-5 z-50 min-w-[260px] font-mono"
//         />
//     );
// }
