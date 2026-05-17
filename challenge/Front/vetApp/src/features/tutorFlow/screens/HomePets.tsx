import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function HomePets() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.header}>
                    <Ionicons name="menu" size={40} />

                    <TouchableOpacity>
                        <Ionicons name="add-circle-outline" size={40} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.h1}>
                    Animais
                </Text>

                <View style={styles.animalCont}>
                    <Text>
                        Nenhum animal cadastrado ainda. Só você!
                    </Text>
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
        fontSize: 40,
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
    }
})