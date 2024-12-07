import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function MostrarQR({ route }) {
  const { saldo } = route.params;  
  const [cantidad, setCantidad] = useState('');
  const [codigoQR, setCodigoQR] = useState(null);

  const handleGenerarQR = () => {
    const cantidadTransferir = parseFloat(cantidad);

    if (isNaN(cantidadTransferir) || cantidadTransferir <= 0) {
      Alert.alert('Error', 'Por favor ingresa una cantidad válida.');
      return;
    }

    if (cantidadTransferir > saldo) {
      Alert.alert('Saldo insuficiente', 'No tienes suficiente saldo para realizar esta transferencia.');
      return;
    }

    setCodigoQR(`Transferencia: $${cantidadTransferir}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Código </Text>

      <TextInput
        style={styles.input}
        placeholder="Cantidad a transferir"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerarQR}>
        <Text style={styles.buttonText}>Generar QR</Text>
      </TouchableOpacity>

      {codigoQR && (
        <View style={styles.qrContainer}>
          <QRCode value={codigoQR} size={200} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 18,
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
