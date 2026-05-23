import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export function PatientDrawerContent(props: any) {
  const { signOut, user } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>{user?.name}</Text>
      </View>
      <DrawerItem 
        label="Início" 
        icon={({color, size}) => <Ionicons name="home" color={color} size={size} />}
        onPress={() => props.navigation.navigate('PatientStack', { screen: 'PatientHome' })} 
      />
      <DrawerItem 
        label="Meus Pets" 
        icon={({color, size}) => <Ionicons name="paw" color={color} size={size} />}
        onPress={() => props.navigation.navigate('PatientStack', { screen: 'HomePets' })} 
      />
      <DrawerItem 
        label="Sair" 
        icon={({color, size}) => <Ionicons name="log-out" color={color} size={size} />}
        onPress={() => signOut()} 
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#1A223D',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
