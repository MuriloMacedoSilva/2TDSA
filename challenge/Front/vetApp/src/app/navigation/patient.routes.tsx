import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AuthStackParamList } from "./types";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { UserRole } from "@/features/auth/types";
import HomePets from "@/features/tutorFlow/screens/HomePets";

const Stack = createNativeStackNavigator<AuthStackParamList>();

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  "PatientHome"
>;

type RouteProps = RouteProp<AuthStackParamList, "PatientHome">;

function PatientHome() {
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute<RouteProps>();

  const { user } = useAuth();

  const role = "tutor";

  const [userName, setUserName] = useState<string>();

  const goToHomePets = () => {
    navigation.navigate("HomePets", { role:role, user:user } )
  }

  useEffect(() => {
    const selectUserName = () => {
      setUserName(user?.name);
    };
    selectUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={require("../../../assets/menu.png")} style={styles.icons} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require("../../../assets/notifications.png")} style={styles.icons} />
          </TouchableOpacity>
        </View>

        <Text style={styles.h1}>
          Bem Vindo(a) {user?.name}
        </Text>

        <TouchableOpacity onPress={goToHomePets} style={styles.imageContainer1}>
          <Image source={require("../../../assets/ImageHome1.png")} style={styles.image} />
          <Text style={styles.textImage}>
            Animais <Ionicons name="arrow-forward" size={20} color={"white"} />
          </Text>
        </TouchableOpacity>

        <Text style={styles.outText}>
          Cadastre, atualize, e veja seus animais aqui.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

export function PatientRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientHome" component={PatientHome} />
      <Stack.Screen name="HomePets" component={HomePets} />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 1000,
    width: "auto",
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
  },
  header:{
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 200,
    marginTop: 50,
    width: "auto",
  },
  icons: {
    width: 40,
    height: 40,
  },
  h1:{
    marginTop: 100,
    fontSize: 25,
    marginLeft: 20,
  },
  imageContainer1: {
    marginTop: 50,
    width: "auto",
  },
  image: {
    width: "auto",
  },
  textImage: {
    color: "#FFF",
    marginTop: -50,
    marginLeft: 20,
    zIndex: 2,
    fontSize: 20,
  },
  outText: {
    fontSize: 17,
    color: "#000",
    marginTop: 60,
    marginLeft: 20,
    width: 300,
  }
})













