export type UserRole = 'tutor' | 'veterinario'

export type User = {
    id: string
    name: string
    email: string
    cpf: string
    phoneNumber: string
    password: string
    role: UserRole
}