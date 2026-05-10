import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { VetRoutes } from './vet.routes'
import { PatientRoutes } from './patient.routes'
import { useAuth } from '@/features/auth/context/AuthContext'

export function Routes() {
  const { userOut } = useAuth()

  return (
    <NavigationContainer>
      {userOut == true ? <AuthRoutes/> : <PatientRoutes/>}
    </NavigationContainer>
  )
}