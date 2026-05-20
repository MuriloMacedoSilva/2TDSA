import { User } from "@/features/auth/types"

export type AuthStackParamList = {
  Splash: undefined
  RoleSelect: undefined
  Login: { role: 'tutor' | 'veterinarian'}
  Register: { role: 'tutor' | 'veterinarian'}
  PatientHome: { role: 'tutor' | 'veterinarian',  user: User }
  HomePets: { role: "tutor" | undefined, user: User | null }
  RegisterPets: { role: "tutor" | undefined, user:User | null }
}