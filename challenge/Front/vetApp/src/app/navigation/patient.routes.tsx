import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";
import { AuthStackParamList } from "./types";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
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
    navigation.navigate("HomePets", { role: role, user: user });
  };

  useEffect(() => {
    const selectUserName = () => {
      setUserName(user?.name);
    };
    selectUserName();
  }, []);

  const handleLink = (url: string) => {
      Linking.openURL(url);
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.subContainer}>
        {/* <View style={styles.headerLogo}>
          <View>
            <Image source={require("../../../assets/Logo.png")} />
          </View>
        </View> */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons
              name="menu"
              size={40}
              style={styles.icons}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="notifications"
              size={40}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.h1}>Bem Vindo(a) {user?.name}</Text>

        <TouchableOpacity onPress={goToHomePets} style={styles.imageContainer1}>
          <Image
            source={require("../../../assets/ImageHome2.png")}
            style={styles.image}
          />
          <Text style={styles.textImage}>
            Animais <Ionicons name="arrow-forward" size={20} color={"white"} />
          </Text>
        </TouchableOpacity>

        <Text style={styles.outText}>
          Cadastre, atualize, e veja seus animais aqui.
        </Text>

        <ScrollView style={styles.carrosel} 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}>
          <View style={styles.divCarrosel}>
            <View style={styles.container2}>
              <Image
                source={require("../../../assets/imageCat2.png")}
                style={styles.imageCont2}
              />
              <Text style={styles.textImageCont2}>
                Clique aqui, e descruba se as vacinas do seu animal estão em dia{" "}
                <Ionicons name="arrow-forward" size={20} color={"white"} />
              </Text>
            </View>

            <View style={styles.container2}>
              <Image
                source={require("../../../assets/imageCat3.png")}
                style={styles.imageCont2}
              />
              <Text style={styles.textImageCont2}>
                Notícias, Artigos, Curiosidades...{" "}
                <Ionicons name="arrow-forward" size={20} color={"white"} />
              </Text>
            </View>
          </View>
        </ScrollView>



        <Text style={styles.h2}>
          Utilize os Serviços VET!!
        </Text>


        <View style={styles.lastContent}>

          <View style={styles.gridCont}>
            <TouchableOpacity style={styles.topic} onPress={goToHomePets}>
              <Ionicons name="paw-sharp" style={styles.textTopic} />
              <Text style={styles.textTopic}>
                Pets
              </Text>
            </TouchableOpacity>

            <View style={styles.topic}>
              <Ionicons name="chatbox" style={styles.textTopic} />
              <Text style={styles.textTopic}>
                Converse com o veterinário
              </Text>
            </View>
          </View>

          <View style={styles.gridCont}>
            <View style={styles.topic}>
              <Ionicons name="notifications" style={styles.textTopic} />
              <Text style={styles.textTopic}>
                Lembretes
              </Text>
            </View>

            <View style={styles.topic}>
              <Ionicons name="newspaper-sharp" style={styles.textTopic} />
              <Text style={styles.textTopic}>
                Curiosidades
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
              <View style={styles.section}>
                <Text style={styles.brand}>CLYVO VET</Text>
                <Text style={styles.description}>
                  A plataforma que cuida do seu pet!
                </Text>
              </View>
        
            
              <View style={styles.section}>
                <Text style={styles.title}>Seções</Text>
                <TouchableOpacity onPress={() => {}}><Text style={styles.link}>Inicio</Text></TouchableOpacity>
                <TouchableOpacity onPress={goToHomePets}><Text style={styles.link}>Pets</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {}}><Text style={styles.link}>Sobre Nós</Text></TouchableOpacity>
              </View>
        
        
              <View style={styles.section}>
                <Text style={styles.title}>Contato</Text>
                <View style={styles.contactItem}>
                  <Ionicons name="mail-outline" size={16} color="#bbb" />
                  <Text style={styles.contactText}>clyvovet@gmail.com</Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="call-outline" size={16} color="#bbb" />
                  <Text style={styles.contactText}>(11) 98765-4321</Text>
                </View>
              </View>
        
              
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialIcon} onPress={() => handleLink('https://instagram.com')}>
                  <Ionicons name="logo-instagram" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon} onPress={() => handleLink('https://github.com')}>
                  <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon} onPress={() => handleLink('https://linkedin.com')}>
                  <Ionicons name="logo-linkedin" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
        
              
              <View style={styles.bottomBar}>
                <Text style={styles.copyright}>
                  © 2026 CLYVO. Todos os direitos reservados.
                </Text>
              </View>
            </View>

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
  header: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 200,
    marginTop: 60,
    width: "auto",
  },
  icons: {
    width: 40,
    height: 40,
  },
  h1: {
    marginTop: 80,
    fontSize: 25,
    marginLeft: 20,
  },
  imageContainer1: {
    marginTop: 50,
    width: "auto",
    height: 300,
  },
  image: {
    width: "auto",
    height: 300,
  },
  textImage: {
    color: "#FFF",
    marginTop: -70,
    marginLeft: 20,
    zIndex: 2,
    fontSize: 20,
  },
  outText: {
    fontSize: 17,
    color: "#000",
    marginTop: 20,
    marginLeft: 20,
    width: 300,
  },
  headerLogo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    paddingTop: 50,
  },
  container2: {
    marginTop: 100,
  },
  imageCont2: {
    height: 220,
    width: 370,
  },
  textImageCont2: {
    color: "#FFF",
    marginTop: -190,
    marginLeft: 20,
    zIndex: 2,
    fontSize: 16,
    width: 300,
  },
  divCarrosel: {
    flex: 1,
    flexDirection: "row",
    gap: 14,
    height: 320,
  },
  carrosel: {
    marginBottom: 0,
    height: 320,
  },
  h2: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 25,
    marginTop: 100,
    marginBottom: 60,
  },
  lastContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  gridCont: {
    gap: 40,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    margin: 20,
    height: 300,
    width: "45%",
  },
  topic: {
    borderWidth: 1,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    gap: 20,
   },
   textTopic: {
    fontSize: 20,
    width: 150,
   }, 
   footer: {
    backgroundColor: '#1A223D',
    padding: 20,
    paddingBottom: 40,
    marginTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  brand: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#bbb',
    fontSize: 14,
    lineHeight: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  link: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    color: '#bbb',
    fontSize: 14,
    marginLeft: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  bottomBar: {
    alignItems: 'center',
  },
  copyright: {
    color: '#777',
    fontSize: 12,
    textAlign: 'center',
  },
});
