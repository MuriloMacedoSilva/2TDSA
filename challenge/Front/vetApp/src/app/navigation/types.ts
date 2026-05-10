import { User } from "@/features/auth/types"

export type AuthStackParamList = {
  Splash: undefined
  RoleSelect: undefined
  Login: { role: 'tutor' | 'veterinario'}
  Register: { role: 'tutor' | 'veterinario'}
  PatientHome: { role: 'tutor' | 'veterinario',  user: User }
  HomePets: { role: "tutor" | undefined, user: User | null }
}