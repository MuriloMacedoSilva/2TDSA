import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("RoleSelect" as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 700,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop: 160,
  },
});
