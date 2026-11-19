"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { INITIAL_TES_AWAL_DATA } from "./constants"

export function useTesAwal() {
    const router = useRouter()
    const [data] = React.useState(INITIAL_TES_AWAL_DATA)

    const handleUlangiTes = () => {
        router.push("/onboarding")
    }

    return {
        data,
        handleUlangiTes,
    }
}
