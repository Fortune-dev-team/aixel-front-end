import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    title: "Tes Awal dan Goal dari tim",
    description:
      "Penilaian diri dan kasus singkat membantu memilih goal. Semua tetap mulai dari Level 1.",
  },
  {
    step: "02",
    title: "Belajar mandiri dibantu AI",
    description:
      "Level 1 dan 2 memakai bahan dari basis pengetahuan yang disiapkan admin, bukan dari internet.",
  },
  {
    step: "03",
    title: "Sertifikat dan penyegaran",
    description:
      "Level 3 diuji mentor lewat wawancara offline dengan rubrik yang sama untuk semua.",
  },
  {
    step: "04",
    title: "Sertifikat dan penyegaran",
    description:
      "Atribut berlaku 12 sampai 18 bulan. Perpanjang dengan bukti kontribusi proyek nyata.",
  },
];

export default function Home() {
  return (
    <div className="bg-[#f8f8f6] min-h-screen p-8 flex items-center justify-center">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full">
        {steps.map((item) => (
          <Card
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
          />
        ))}
      </div> */}
      <Button variant="coral" leftIcon="←" rightIcon="→" >Button</Button>
    </div>
  );
}