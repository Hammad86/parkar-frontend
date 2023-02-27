import { View, Text,StyleSheet, Image } from 'react-native'
import React  from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      
        <Image
        style={styles.logo}
        
        source={require('../assets/logo/app01.png')}
        resizeMode='contain'
        />
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

