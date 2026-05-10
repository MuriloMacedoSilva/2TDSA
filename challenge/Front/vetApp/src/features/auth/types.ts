export type UserRole = 'tutor' | 'veterinario'

export type User = {
    id: string
    name: string
    role: UserRole
}