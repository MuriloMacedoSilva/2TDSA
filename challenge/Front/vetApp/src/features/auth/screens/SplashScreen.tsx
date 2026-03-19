import { View, Image, StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export function SplashScreen() {
  const navigation = useNavigation()

useEffect(() => {
  const timer = setTimeout(() => {
    navigation.navigate('RoleSelect' as never)
  }, 3000)

  return () => clearTimeout(timer)
}, [])

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/LogoSplash.png')} 
        style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
})