import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    no: "01",
    title: "Pretest kompetensi",
    desc: "Petakan kemampuan awal tiap anggota tim lewat pretest singkat.",
  },
  {
    no: "02",
    title: "Penetapan mentor",
    desc: "Admin menunjuk mentor dari hasil pretest. Anggota konfirmasi bersedia, lalu sesi dimulai.",
  },
  {
    no: "03",
    title: "Jalur belajar",
    desc: "Atribut yang perlu dikembangkan terhubung ke materi, tes, dan target belajar.",
  },
  {
    no: "04",
    title: "Mentoring",
    desc: "Cari mentor dari tim sendiri, ajukan permintaan, lalu jadwalkan sesi bersama.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl leading-tight md:text-5xl">
            Pemetaan kompetensi dan mentoring untuk tim startup
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Aixel memetakan kemampuan awal tiap anggota, lalu menghubungkan
            mereka dengan materi belajar dan mentor dari tim sendiri.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/pretest" className={buttonVariants()}>
              Mulai pretest
            </Link>

            <Link href="#cara-kerja" className={buttonVariants({ variant: "secondary" })}>
              Lihat cara kerja
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image src="/mascot.svg" alt="Maskot Aixel" width={280} height={280} priority />
        </div>
      </section>

      {/* Fitur */}
      <section id="cara-kerja" className="mt-24">
        <h2 className="text-2xl">Yang bisa dilakukan Aixel</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.no}>
              <CardHeader>
                <span className="font-mono text-3xl font-bold text-primary">{f.no}</span>
                <CardTitle className="font-mono text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}