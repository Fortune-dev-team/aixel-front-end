"use client";

import React, { useState } from "react";
import { Card, Form, Link } from "@heroui/react";
import { TextFieldInput } from "../input/text-field-input";
import { AuthSubmitButton } from "../button/auth-submit-button";
import PasswordFieldInput from "../input/password-field-input";
import AuthGoogleButton from "../button/auth-google-button";

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;

        console.log("Submitting:", { email, password });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#ece9e2] p-4 font-sans text-[#111111]">
            <Card className="w-full max-w-[440px] rounded-xl border-[1.5px] border-black bg-[#faf9f6] p-7 shadow-[5px_5px_0px_0px_#000000]">
                <Card.Header className="p-0 pb-6">
                    <Card.Title className="font-mono text-[26px] font-bold tracking-tight text-black">
                        Masuk ke Aixel
                    </Card.Title>
                </Card.Header>

                <Card.Content className="p-0">
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <TextFieldInput
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="nama@contoh.com"
                            description="Gunakan email kerja Anda"
                            isRequired
                            value={email}
                            onChange={setEmail}
                        />

                        <PasswordFieldInput
                            label="Kata sandi"
                            name="password"
                            placeholder="Masukkan kata sandi"
                        />

                        <AuthSubmitButton />
                    </Form>

                    <div className="mt-5 flex items-center justify-between text-xs text-neutral-700">
                        <span>
                            Belum punya akun?{" "}
                            <Link
                                href="/sign-up"
                                className="font-bold text-black underline underline-offset-2"
                            >
                                Daftar
                            </Link>
                        </span>

                        <Link
                            href="/forgot-password"
                            className="text-neutral-700 underline underline-offset-2 hover:text-black"
                        >
                            Lupa kata sandi?
                        </Link>
                    </div>

                    <div className="my-5 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-neutral-400" />
                        <span className="font-mono text-xs text-neutral-600">Atau</span>
                        <div className="h-[1px] flex-1 bg-neutral-400" />
                    </div>

                    <AuthGoogleButton />
                </Card.Content>
            </Card>
        </main>
    );
}