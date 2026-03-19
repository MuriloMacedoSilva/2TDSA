export type UserRole = 'patient' | 'vet'

export type User = {
    id: string
    name: string
    role: UserRole
}