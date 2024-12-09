import React from 'react'; 
import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';

export default function Menu({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/fondo.jpg')}  
      style={styles.menuContainer}
      resizeMode="cover"
    >
      <Text style={styles.title}>PAPU Banco</Text>

      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => navigation.navigate('Register')} 
      >
        <Text style={styles.menuText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => navigation.navigate('Login')} 
      >
        <Text style={styles.menuText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: '#fff', 
    marginBottom: 30,  
    textAlign: 'center',
  },
  menuButton: {
    padding: 15,  
    backgroundColor: '#007bff',
    borderRadius: 50,
    marginBottom: 20,  
    width: '80%',  
    alignItems: 'center',  
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

