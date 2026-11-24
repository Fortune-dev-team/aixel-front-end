interface RubrikWawancaraHeaderProps {
    title?: string
    description?: string
}

export function RubrikWawancaraHeader({
    title = "Rubrik Wawancara",
    description = "Lembar penilaian yang sama untuk semua mentor. Anda tidak boleh menilai diri sendiri atau orang yang punya konflik kepentingan.",
}: RubrikWawancaraHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="font-heading text-xl font-extrabold tracking-tight text-[#0A0A0A]">
                {title}
            </h1>
            <p className="mt-1 font-sans text-xs text-[#404040]">{description}</p>
        </div>
    )
}