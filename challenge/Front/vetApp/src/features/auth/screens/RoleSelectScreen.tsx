import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/app/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  "RoleSelect"
>;

export default function RoleSelectScreen() {
  const navigation = useNavigation<NavigationProps>();



  function handleSelect(role: "tutor" | "veterinario") {
    navigation.navigate("Login", { role });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <View>
          <View style={styles.ImageContainer}>
            <Image
              source={require("../../../../assets/ImageRole.png")}
              style={styles.Image}
            />
          </View>

          <View style={styles.textCont}>
            <Text style={styles.h1}>
              Com qual objetivo você irá usar a CLYVO VET?
            </Text>

            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => handleSelect("tutor")}
            >
              <Text style={styles.textButtons}>Sou Tutor(a)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => handleSelect("veterinario")}
            >
              <Text style={styles.textButtons}>Sou Veterinário(a)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: "100%"
  },

  subContainer: {
    width: "auto",
  },

  ImageContainer: {
    top: 0,
    left: 0,
  },

  Image: {
    width: "auto",
  },

  textCont: {
    width: "auto",
    flex: 1,
    alignItems: "center",
    marginBottom: 100,
  },

  h1: {
    width: "auto",
    marginTop: 50,
    marginBottom: 70,
    marginLeft: 20,
    fontSize: 22,
    flexWrap: "wrap",
  },

  textButtons: {
    fontSize: 17,
  },

  Buttons: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#1A223D",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 1,
  },
});
