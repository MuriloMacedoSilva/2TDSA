import { View, Image, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/services/api";

export function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {

    const ping = async () => await api.get("tutor/ping")
    ping();

    const timer = setTimeout(() => {
      navigation.navigate("RoleSelect" as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerBox}>
          <Image
            source={require("../../../../assets/LogoSplash.png")}
            style={styles.logo}
          />
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