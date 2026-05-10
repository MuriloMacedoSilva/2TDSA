import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/features/auth/context/AuthContext";
import { AuthStackParamList } from "@/app/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { api } from "@/services/api";
import { AxiosError } from "axios";

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type RouteProps = RouteProp<AuthStackParamList, "Register">;

export function RegisterScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const { role } = route.params;

  // variáveis do usuario
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [cpf, setCpf] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [crmvNumero, setCrmvNumero] = useState("")
  const [crmvEstado, setCrmvEstado] = useState("")
  const [clinica, setClinica] = useState("")

  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !senha) {
      Alert.alert("erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/${role}`, role === "tutor" ? { name, email, cpf, phoneNumber, senha, role } : { name, email, cpf, phoneNumber, senha, crmvNumero, crmvEstado, cnpj, clinica, role })

      Alert.alert("sucesso, usuario criado")
      navigation.navigate("Login", { role })
    } catch(error){
      const err = error as AxiosError<{ message: string }>;
      Alert.alert("Erro", err.response?.data?.message || "Falha ao cadastrar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container1}>
          <Text style={styles.title}>
            {role === "veterinario" ? "Cadastro Veterinário" : "Cadastro Tutor"}
          </Text>

          <TextInput placeholder="Nome" style={styles.input} onChangeText={setName} />
          <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} />
          <TextInput placeholder="CPF" style={styles.input} onChangeText={setCpf} keyboardType="numeric" />
          <TextInput placeholder="Tel" style={styles.input} onChangeText={setPhoneNumber} keyboardType="numeric" />

          {role === "veterinario" && (
            <>
              <TextInput placeholder="CNPJ" style={styles.input} onChangeText={setCnpj} keyboardType="numeric" />
              <TextInput placeholder="CRMV Número" style={styles.input} onChangeText={setCrmvNumero} keyboardType="numeric" />
              <TextInput placeholder="CRMV Estado" style={styles.input} onChangeText={setCrmvEstado} />
              <TextInput placeholder="Clínica" style={styles.input} onChangeText={setClinica} />
            </>
          )}

          { loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>}

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Já tem conta? Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 800,
  },

  container1: {
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
    fontSize: 20,
    height: 60
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

  backText: {
    marginTop: 20,
    textAlign: "center",
  },
});
