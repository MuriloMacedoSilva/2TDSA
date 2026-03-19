export type AuthStackParamList = {
  Splash: undefined
  RoleSelect: undefined
  Login: { role: 'patient' | 'vet' }
  Register: { role: 'patient' | 'vet' }
}