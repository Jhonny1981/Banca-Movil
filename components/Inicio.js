import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function Inicio() {
  const [cantidad, setCantidad] = useState('');

  const handleSaveAmount = () => {
    if (cantidad.trim() === '' || isNaN(cantidad) || Number(cantidad) <= 0) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    alert(`Has ingresado $${cantidad} con éxito.`);
    setCantidad(''); 
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Ingreso de Dinero</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa una cantidad"
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveAmount}>
          <Text style={styles.buttonText}>Guardar Cantidad</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '90%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 10,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    title: {
      fontSize: 28,
      color: '#fff',
      marginBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
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
      textAlign: 'center',
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
      fontSize: 18,
      fontWeight: 'bold',
    },
  });