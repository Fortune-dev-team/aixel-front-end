"use client";

import { TextLabel } from "@/components/ui/textlabel";
import { TextHelper } from "@/components/ui/texthelper";
import { TextMessage } from "@/components/ui/textmesaage";
import { TextLink } from "@/components/ui/textlink";
import { ProgressBar } from "@/components/ui/progressbar";
import { AnswerOptionGroup } from "@/components/ui/answeroption";
import { ChoiceGroup } from "@/components/ui/choice";
import { useState } from "react";
import { FormField } from "@/components/ui/formfield";
import { StepBadge } from "@/components/ui/stepbadge";
import { NotifCount } from "@/components/ui/notifcount";
import { DataTable, type DataTableColumn } from "@/components/ui/tableheader";


interface Member { id: number; nama: string; atribut: string; status: string }

const members: Member[] = [
  { id: 1, nama: "Andi", atribut: "Admin", status: "Aktif" },
  { id: 2, nama: "Budi", atribut: "Editor", status: "Nonaktif" },
];

const columns: DataTableColumn<Member>[] = [
  { key: "nama", label: "Nama" },
  { key: "atribut", label: "Atribut" },
  { key: "status", label: "Status" },
  { key: "aksi", label: "Aksi", render: () => <button>Edit</button> },
];

export default function Home() {
  const [answer, setAnswer] = useState("b");
  const [choice, setChoice] = useState("3");
  return (
    <main className="mx-auto flex max-w-md flex-col gap-8 bg-[#d4d4d4] p-8">
      <section className="flex flex-col gap-1">
        <TextLabel optional>Email</TextLabel>
        <TextHelper>Gunakan email kerja Anda</TextHelper>
      </section>

      <section className="flex flex-col gap-1">
        <TextMessage variant="error">Text message</TextMessage>
        <TextMessage variant="success">Text message</TextMessage>
        <TextMessage variant="warning" size="sm" soft>Text message</TextMessage>
        <TextMessage variant="info">Text message</TextMessage>
      </section>

      <section className="flex flex-col gap-1">
        <TextLink href="#">Text link</TextLink>
        <TextLink href="#" variant="brand" icon="external">Text link</TextLink>
        <TextLink href="#" variant="muted" icon="none">Text link</TextLink>
      </section>


      <section className="flex flex-col gap-2">
        {[0, 25, 50, 75, 100].map((v) => <ProgressBar key={v} value={v} />)}
      </section>

      <section className="flex flex-col gap-4">
        <FormField label="Email" type="email" isRequired placeholder="nama@contoh.com" helperText="Gunakan email kerja Anda" />
        <FormField label="Email" type="email" isRequired placeholder="nama@contoh.com" errorMessage="Email tidak valid" />
      </section>

      <AnswerOptionGroup
        groupLabel="Pertanyaan"
        value={answer}
        onChange={setAnswer}
        options={[
          { value: "a", label: "Answer of question" },
          { value: "b", label: "Answer of question" },
        ]}
      />

      <ChoiceGroup groupLabel="Skala" count={3} value={choice} onChange={setChoice} />

      <StepBadge step={1} />
      <NotifCount count={2} />
      <NotifCount variant="dot" />
      <DataTable ariaLabel="Daftar anggota" columns={columns} rows={members} />
    </main>
  );
}