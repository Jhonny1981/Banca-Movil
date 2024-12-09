import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  useEffect(() => {
    const cargarDatosGuardados = async () => {
      try {
        const correoGuardado = await AsyncStorage.getItem('correo');
        const contraseñaGuardada = await AsyncStorage.getItem('contraseña');
        if (correoGuardado) setCorreo(correoGuardado);
        if (contraseñaGuardada) setContraseña(contraseñaGuardada);
      } catch (error) {
        console.error('Error al cargar los datos guardados:', error);
      }
    };
    cargarDatosGuardados();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.9:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: correo, contraseña }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('correo', correo);
        await AsyncStorage.setItem('contraseña', contraseña);

        const user = data.user;
        await AsyncStorage.setItem('userId', user.id.toString());
        await AsyncStorage.setItem('dinero', user.dinero.toString());

        navigation.navigate('Inicio');
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/p2.png')} style={styles.background} resizeMode="cover">
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
          <Text style={styles.buttonText}>Ingresar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
