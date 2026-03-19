import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@/app/navigation/types'

type NavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  'RoleSelect'
>

export default function RoleSelectScreen() {
  const navigation = useNavigation<NavigationProps>()

  function handleSelect(role: 'patient' | 'vet') {
  navigation.navigate('Login', { role })
}

  return (
    <View>
      <View style={styles.ImageContainer}>
        <Image
          source={require('../../../../assets/ImageRole.png')}
          style={styles.Image}
        />
      </View>

      <Text style={styles.h1}>
        Com qual objetivo você irá usar a CLYVO VET?
      </Text>

      <TouchableOpacity
        style={styles.Buttons}
        onPress={() => handleSelect('patient')}
      >
        <Text style={styles.textButtons}>
          Sou Tutor(a)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Buttons}
        onPress={() => handleSelect('vet')}
      >
        <Text style={styles.textButtons}>
          Sou Veterinário(a)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    width: 700,
    top: 0,
    left: 0
  },

  Image: {
    width: 530,
  },

  h1: {
    marginTop: 50,
    marginBottom: 70,
    marginLeft: 40,
    fontSize: 22,
  },

  textButtons: {
    fontSize: 17
  },

  Buttons: {
    borderWidth: 1,
    borderColor: "#1A223D",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 1, // só adicionei pra não colar um no outro
    cursor: "pointer",
  }
});