import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = () => {
    console.log('Datos de inicio de sesión:', { correo, contraseña });
  };

  return (
    <ImageBackground 
      source={require('../assets/sesion1.jpg')}  
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,  
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});