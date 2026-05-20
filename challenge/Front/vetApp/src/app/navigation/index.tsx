import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { VetRoutes } from './vet.routes';
import { PatientRoutes } from './patient.routes';
import { useAuth } from '@/features/auth/context/AuthContext';

export function Routes() {
  const { userOut, user, loading } = useAuth();

  // Se o AsyncStorage ainda estiver lendo os dados locais, segura o app
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        <ActivityIndicator size="large" color="#1A223D" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userOut === true ? (
        <AuthRoutes />
      ) : user?.role === 'veterinarian' ? (
        <VetRoutes />
      ) : (
        <PatientRoutes />
      )}
    </NavigationContainer>
  );
}