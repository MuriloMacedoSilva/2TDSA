import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SplashScreen } from "@/features/auth/screens/SplashScreen" 
import RoleSelectScreen from '@/features/auth/screens/RoleSelectScreen'
// import { RoleSelectScreen } from '@/features/auth/screens/RoleSelectScreen'
// import { LoginScreen } from '@/features/auth/screens/LoginScreen'

import { AuthStackParamList } from '@/app/navigation/types'
import { LoginScreen } from '@/features/auth/screens/LoginScreen'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="Login" component={LoginScreen}/>
    </Stack.Navigator>
  )
}



// <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      // <Stack.Screen name="Login" component={LoginScreen} />