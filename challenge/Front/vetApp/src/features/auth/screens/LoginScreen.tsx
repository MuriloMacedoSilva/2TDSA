import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth } from '@/features/auth/context/AuthContext'
import { AuthStackParamList } from '@/app/navigation/types'

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>

type RouteProps = RouteProp<AuthStackParamList, 'Login'>

export function LoginScreen() {
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute<RouteProps>()

  const { role } = route.params

  const { signIn } = useAuth()

  function handleLogin() {
    signIn({
      id: '1',
      name: 'Murilo',
      role
    })
  }

  function goToRegister() {
    navigation.navigate('Register', { role })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role === 'vet' ? 'Login Veterinário' : 'Login Tutor'}
      </Text>

      <TextInput
        placeholder="CPF"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToRegister}>
        <Text style={styles.registerText}>
          Não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },

  title: {
    fontSize: 22,
    marginBottom: 30
  },

  input: {
    borderWidth: 1,
    borderColor: '#1A223D',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8
  },

  button: {
    borderWidth: 1,
    borderColor: '#1A223D',
    padding: 15,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    fontSize: 16
  },

  registerText: {
    marginTop: 20,
    textAlign: 'center'
  }
})