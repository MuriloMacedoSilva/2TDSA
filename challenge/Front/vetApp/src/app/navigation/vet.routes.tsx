import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'

const Stack = createNativeStackNavigator()

function VetHome() {
  return (
    <View>
      <Text>Home Vet</Text>
    </View>
  )
}

export function VetRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VetHome" component={VetHome} />
    </Stack.Navigator>
  )
}