import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function Inicio({ navigation }) {
  const [cantidad, setCantidad] = useState('');
  const [saldo, setSaldo] = useState(0);

  const handleIngreso = () => {
    const nuevaCantidad = parseFloat(cantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida para ingresar.');
      return;
    }
    setSaldo(saldo + nuevaCantidad);
    alert(`Has ingresado $${nuevaCantidad}. Tu nuevo saldo es $${saldo + nuevaCantidad}.`);
    setCantidad('');
  };

  const handleRetiro = () => {
    const nuevaCantidad = parseFloat(cantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida para retirar.');
      return;
    }
    if (nuevaCantidad > saldo) {
      alert('Fondos insuficientes para realizar este retiro.');
      return;
    }
    setSaldo(saldo - nuevaCantidad);
    alert(`Has retirado $${nuevaCantidad}. Tu nuevo saldo es $${saldo - nuevaCantidad}.`);
    setCantidad('');
  };

  const handleGenerarQR = () => {
    const nuevaCantidad = parseFloat(cantidad);
    if (nuevaCantidad <= 0 || isNaN(nuevaCantidad)) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }
    if (saldo >= nuevaCantidad) {
      navigation.navigate('GenerarQR', { cantidad: nuevaCantidad }); 
    } else {
      alert('No tienes saldo suficiente para generar un código QR.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Tu saldo: ${saldo.toFixed(2)}</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa una cantidad"
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleIngreso}>
            <Text style={styles.buttonText}>Ingresar Dinero</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRetiro}>
            <Text style={styles.buttonText}>Retirar Dinero</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleGenerarQR}>
            <Text style={styles.buttonText}>Generar Código QR</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 24,
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
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
