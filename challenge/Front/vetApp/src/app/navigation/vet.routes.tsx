import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  "VetHome"
>;

type RouteProps = RouteProp<AuthStackParamList, "VetHome">;

function VetHome() {
  const navigation = useNavigation<NavigationProps>();

  
  const route = useRoute<RouteProps>();
  
  const { user } = useAuth();
  const { signOut } = useAuth();

  const goExit = () => {
    signOut();
  }

  return (
    <View>
      <Text>Home Vet</Text>
      <TouchableOpacity onPress={goExit} >
        <Text>
          sair
        </Text>
      </TouchableOpacity>
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