import { View, Image, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/services/api";

export function SplashScreen() {
  const navigation = useNavigation();
  const [loadingText, setLoadingText] = useState("Iniciando o aplicativo...");

  useEffect(() => {
    let isMounted = true;

    const wakeUpAPI = async () => {
      try {
        setLoadingText("Conectando ao servidor (isso pode levar um momento)...");
        
        // Faz a requisição e espera a resposta, não importa quanto tempo demore (dentro do limite do Axios)
        await api.get("tutor/ping");

        if (isMounted) {
          // Só navega quando a API responder com sucesso
          navigation.navigate("RoleSelect" as never);
        }
      } catch (error) {
        console.error("Erro ao acordar a API:", error);
        if (isMounted) {
          setLoadingText("Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.");
        }
      }
    };

    wakeUpAPI();

    // Limpeza caso o componente seja desmontado antes da requisição terminar
    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerBox}>
          <Image
            source={require("../../../../assets/LogoSplash.png")}
            style={styles.logo}
          />
          
          {/* Adicionado feedback visual para o usuário */}
          <ActivityIndicator size="large" color="#1A223D" style={{ marginTop: 20 }} />
          <Text style={styles.loaderText}>{loadingText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  loaderText: {
    marginTop: 15,
    fontSize: 14,
    color: "#1A223D",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});