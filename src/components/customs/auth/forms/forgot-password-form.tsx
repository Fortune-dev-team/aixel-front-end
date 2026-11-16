"use client";

import React, { useState } from "react";
import { Card, Form, Link } from "@heroui/react";
import { TextFieldInput } from "../input/text-field-input";
import { AuthSubmitButton } from "../button/auth-submit-button";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Reset password for:", { email });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#ece9e2] p-4 font-sans text-[#111111]">
            <Card className="w-full max-w-[440px] rounded-xl border-[1.5px] border-black bg-[#faf9f6] p-7 shadow-[5px_5px_0px_0px_#000000]">
                <Card.Header className="p-0 pb-6">
                    <Card.Title className="font-mono text-[26px] font-bold tracking-tight text-black">
                        Lupa kata sandi
                    </Card.Title>
                </Card.Header>

                <Card.Content className="p-0">
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <TextFieldInput
                            name="email"
                            type="email"
                            label="Email terdaftar"
                            placeholder="nama@contoh.com"
                            description="Gunakan email kerja Anda"
                            isRequired
                            value={email}
                            onChange={setEmail}
                        />

                        <AuthSubmitButton
                            label="Kirim tautan reset"
                            className="font-mono"
                        />
                    </Form>

                    <div className="mt-5">
                        <Link
                            href="/login"
                            className="text-xs text-neutral-700 underline underline-offset-2 hover:text-black"
                        >
                            Kembali ke halaman masuk
                        </Link>
                    </div>
                </Card.Content>
            </Card>
        </main>
    );
}