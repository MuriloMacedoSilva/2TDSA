import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'


const Stack = createNativeStackNavigator()

function PatientHome() {
  return (
    <View>
      <Text>Home Patient</Text>
    </View>
  )
}

export function PatientRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientHome" component={PatientHome} />
    </Stack.Navigator>
  )
}