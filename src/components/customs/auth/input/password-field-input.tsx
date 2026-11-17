"use client";

import { useState } from 'react';
import Link from 'next/link';
import { TextField, Label, InputGroup, FieldError } from '@heroui/react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordFieldInputProps {
    label: string;
    name: string;
    placeholder: string;
    showForgotLink?: boolean;
    startIcon?: React.ReactNode;
}

export default function PasswordFieldInput({ label, name, placeholder, showForgotLink, startIcon }: PasswordFieldInputProps) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <TextField name={name} className='group flex w-full flex-col gap-1.5' isRequired>
            <div className='flex items-center justify-between'>
                <Label className='font-mono text-sm font-bold text-black after:ml-0.5 after:text-[#e11d48] group-data-[invalid=true]:text-[#e11d48]' isRequired>
                    {label}
                </Label>
                {showForgotLink && (
                    <Link href='/forget-password' className='text-xs text-neutral-700 underline underline-offset-2 hover:text-black'>
                        Lupa Password?
                    </Link>
                )}
            </div>

            <InputGroup
                className='flex h-11 w-full items-center gap-3 rounded-lg border-[1.5px] border-black bg-white  shadow-none transition-all focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black group-data-[invalid=true]:border-[#e11d48]'
            >

                <InputGroup.Input
                    type={isVisible ? 'text' : 'password'}
                    placeholder={placeholder}
                    className='w-full bg-transparent text-sm text-black placeholder:text-neutral-400 outline-none'
                />

                <InputGroup.Suffix>
                    <button
                        type='button'
                        onClick={toggleVisibility}
                        className='shrink-0 cursor-pointer focus:outline-none'
                    >
                        {isVisible ? (
                            <EyeOff className='text-neutral-600 transition-colors hover:text-black group-data-[invalid=true]:text-[#e11d48]' size={18} />
                        ) : (
                            <Eye className='text-neutral-600 transition-colors hover:text-black group-data-[invalid=true]:text-[#e11d48]' size={18} />
                        )}
                    </button>
                </InputGroup.Suffix>
            </InputGroup>

            <FieldError className='text-xs text-[#e11d48]' />
        </TextField>
    );
}