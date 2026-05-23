import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/services/api";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/app/navigation/types";
import { useNavigation, useRoute, RouteProp, DrawerActions } from "@react-navigation/native";
import { useAuth } from "@/features/auth/context/AuthContext";
import { AxiosError } from "axios";
import { Pets } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  "HomePets"
>;

type RouteProps = RouteProp<AuthStackParamList, "HomePets">;

export default function HomePets() {

    const navigation = useNavigation<NavigationProps>()

    const route = useRoute<RouteProps>();

    const { user } = useAuth();

    const [animals, setAnimals] = useState<Pets[]>([])
    const [erro, setErro] = useState<string>()

    const goToRegisterPets = () => {
        navigation.navigate("RegisterPets", { user:user })
    }


    const readPets = async () => {
        try {
            const response:[] = await api.get(`/${user?.role}/${user?.cpf}/ReadAnimals`)

            setAnimals(response)

            console.log(animals)
            
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            setErro(err.response?.data?.message)
        }
    }


    useEffect(() => {
        readPets();
        console.log(animals)
    }, [])



    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Ionicons name="menu" size={40} />
                    </TouchableOpacity>
                    

                    <TouchableOpacity onPress={goToRegisterPets}>
                        <Ionicons name="add-circle-outline" size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contH1}>
                    <Text style={styles.h1}>
                    Animais
                </Text>
                </View>

                <View style={styles.animalCont}>
                    {erro?<Text>{erro}</Text>:
                    <FlatList 
                    data={animals}
                    renderItem={({item}) => (
                        <View>
                            <Text>
                                {item.name}
                            </Text>
                        </View>
                    )}
                    />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 60,
    },
    h1: {
        fontSize: 34,
        fontWeight: "600",
        width: "100%",
        paddingLeft: "31%",
        paddingRight: " 32%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,

    },
    animalCont: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
        marginTop: 100,
    },
    contH1: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 30,
        rowGap: 1,
    }
})