import { StatusBadge } from "../widgets/status-badge";
import type { CompetencyResult } from "../interfaces";

interface ResultTableProps {
    results: CompetencyResult[];
}

export function ResultTable({ results }: ResultTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border-[1.5px] border-black bg-white">
            <table className="w-full border-collapse text-left text-xs">
                <thead>
                    <tr className="bg-black font-mono text-white">
                        <th className="px-3.5 py-2.5 font-semibold">Aspek</th>
                        <th className="px-3.5 py-2.5 font-semibold">Penilaian Diri</th>
                        <th className="px-3.5 py-2.5 font-semibold">Hasil Tes</th>
                        <th className="px-3.5 py-2.5 font-semibold">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-300">
                    {results.map((row) => (
                        <tr key={row.key} className="text-black">
                            <td className="px-3.5 py-3 font-medium">{row.label}</td>
                            <td className="px-3.5 py-3 font-mono">{row.selfScore}/5</td>
                            <td className="px-3.5 py-3">
                                <StatusBadge variant={row.isGap ? "warning" : "success"}>
                                    {row.testStatus}
                                </StatusBadge>
                            </td>
                            <td className="px-3.5 py-3">
                                {row.isGap ? (
                                    <StatusBadge variant="action">{row.actionLabel}</StatusBadge>
                                ) : (
                                    <span className="text-neutral-500">-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}