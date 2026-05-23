import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRoute, useNavigation, RouteProp, DrawerActions } from '@react-navigation/native';
import { AuthStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VetDrawerContent } from './components/VetDrawerContent';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const Drawer = createDrawerNavigator();

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  "VetHome"
>;

type RouteProps = RouteProp<AuthStackParamList, "VetHome">;

function VetHome() {
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
         <Text>Abrir Menu</Text>
      </TouchableOpacity>
      <Text>Home Vet</Text>
      <TouchableOpacity onPress={signOut} >
        <Text>sair</Text>
      </TouchableOpacity>
    </View>
  )
}

function VetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VetHome" component={VetHome} />
    </Stack.Navigator>
  )
}

export function VetRoutes() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <VetDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="VetStack" component={VetStack} />
    </Drawer.Navigator>
  )
}
