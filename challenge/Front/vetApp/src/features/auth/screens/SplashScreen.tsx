import { View, Image, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/services/api";

export function SplashScreen() {
  const navigation = useNavigation();
  const [statusText, setStatusText] = useState("Iniciando...");

  useEffect(() => {
    let isMounted = true;

    const startApp = async () => {
      // Tentativas de acordar a API hospedada no Render
      for (let i = 0; i < 5; i++) {
        try {
          if (!isMounted) return;
          setStatusText("Conectando ao servidor...");
          
          // Dispara o ping para o backend
          await api.get(`/tutor/ping`);
          
          // Se chegou aqui, a API respondeu com sucesso
          break; 
        } catch (error) {
          console.log(`Tentativa ${i + 1} de acordar o Render falhou. Tentando novamente...`);
          // Espera 3 segundos antes de dar o próximo ping
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }

      // Após acordar a API (ou estourar as tentativas), avança o fluxo
      if (isMounted) {
        navigation.navigate("RoleSelect" as never);
      }
    };

    startApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerBox}>
          <Image
            source={require("../../../../assets/LogoSplash.png")}
            style={styles.logo}
          />
          <ActivityIndicator size="small" color="#1A223D" style={{ marginTop: 20 }} />
          <Text style={styles.loaderText}>{statusText}</Text>
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
    marginTop: 10,
    fontSize: 14,
    color: "#1A223D",
  },
});