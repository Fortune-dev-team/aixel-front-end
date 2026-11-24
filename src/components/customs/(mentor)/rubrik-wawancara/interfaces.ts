export interface RubrikLevelColumn {
    score: number
    label: string
}

export interface RubrikAspekItem {
    id: string
    aspek: string
    level1: string
    level2: string
    level3: string
    level4: string
}

export interface RubrikWawancaraContentProps {
    items?: RubrikAspekItem[]
    columns?: RubrikLevelColumn[]
    isLoading?: boolean
}