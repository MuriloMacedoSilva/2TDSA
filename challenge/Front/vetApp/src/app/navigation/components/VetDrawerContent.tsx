import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export function VetDrawerContent(props: any) {
  const { signOut, user } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu Veterinário</Text>
      </View>
      <DrawerItem 
        label="Início" 
        icon={({color, size}) => <Ionicons name="home" color={color} size={size} />}
        onPress={() => props.navigation.navigate('VetStack', { screen: 'VetHome' })} 
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
