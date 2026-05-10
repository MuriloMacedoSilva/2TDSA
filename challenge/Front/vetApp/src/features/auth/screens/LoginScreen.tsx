import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/features/auth/context/AuthContext";
import { AuthStackParamList } from "@/app/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { User } from "../types";

type NavigationProps = NativeStackNavigationProp<AuthStackParamList, "Login">;

type RouteProps = RouteProp<AuthStackParamList, "Login">;

export function LoginScreen() {
  // variáveis de navegação
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const { role } = route.params;

  const selectUser = async (): Promise<User | undefined> => {
    try{
      const response = await api.get(`${role}/${cpf}`)
      const { id, name } = response.data;
      const user = { id, name, role }
      return user;
    }catch(error){
      const err = error as AxiosError<{ message: string }>
    }
  }

  const [loading, setLoadin] = useState(false);

  // variáveis do usuario
  const [senha, setSenha] = useState("")
  const [cpf, setCpf] = useState("")

  const { signIn } = useAuth();

  const handleLogin = async () => {

    if (!cpf || !senha) {
      Alert.alert("Erro", "Preencha todos os campos")
      return;
    }

    setLoadin(true); 

    try {
      await api.post(`/${role}/Login`, { cpf, senha })

      const userLogged = await selectUser()

      if(!userLogged) return

      signIn(userLogged)

    } catch(error) {
      const err = error as AxiosError<{ message: string }>;
      Alert.alert("Error", err.response?.data?.message || "Falha no Login")
    }finally{
      setLoadin(false);
    }
  }

  function goToRegister() {
    navigation.navigate("Register", { role });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.title}>
            {role === "veterinario" ? "Login Veterinário" : "Login Tutor"}
          </Text>

          <TextInput placeholder="CPF" style={styles.input} onChangeText={setCpf}  />

          <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} />

          { loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>}

          <TouchableOpacity onPress={goToRegister}>
            <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 800
  },

  container2: {
  },

  title: {
    fontSize: 22,
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#1A223D",
    padding: 15,
    marginBottom: 25,
    borderRadius: 8,
    height: 60,
    fontSize: 20,
  },

  button: {
    borderWidth: 1,
    borderColor: "#1A223D",
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    fontSize: 16,
  },

  registerText: {
    marginTop: 20,
    textAlign: "center",
  },
});
