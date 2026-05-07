import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth } from '@/features/auth/context/AuthContext'
import { AuthStackParamList } from '@/app/navigation/types'

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>

type RouteProps = RouteProp<AuthStackParamList, 'Register'>

export function RegisterScreen() {
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute<RouteProps>()

  const { role } = route.params
  const { signIn } = useAuth()

  function handleRegister() {
    signIn({
      id: '1',
      name: 'Novo usuário',
      role
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role === 'vet' ? 'Cadastro Veterinário' : 'Cadastro Tutor'}
      </Text>

      <TextInput placeholder="Nome" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
      <TextInput placeholder='CPF' style={styles.input} />
      <TextInput placeholder='Tel' style={styles.input} />

      {role === 'vet' && (
        <>
          <TextInput placeholder="CNPJ" style={styles.input} />
          <TextInput placeholder="CRMV Número" style={styles.input} />
          <TextInput placeholder="CRMV Estado" style={styles.input} />
          <TextInput placeholder="Clínica" style={styles.input} />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Já tem conta? Voltar</Text>
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

  backText: {
    marginTop: 20,
    textAlign: 'center'
  }
})