import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Inicio({ navigation }) {
  const [cantidad, setCantidad] = useState('');
  const [efectivo, setEfectivo] = useState(0);
  const [historial, setHistorial] = useState([]);

  //Carga el efectivo guardado 
  useEffect(() => {
    const cargarEfectivo = async () => {
      try {
        const efectivoGuardado = await AsyncStorage.getItem('dinero');
        if (efectivoGuardado) {
          setEfectivo(parseFloat(efectivoGuardado));
        }
      } catch (error) {
        console.error('Error al cargar el efectivo:', error);
      }
    };
    cargarEfectivo();
  }, []);

  //Nos da la fecha y hora del movimiento
  const obtenerFecha = () => {
    const fecha = new Date();
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
  };

  //Actualiza el dinero en el server y en AsyncStorage
  const actualizarEfectivo = async (nuevoEfectivo) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await fetch('http://192.168.0.9:3000/actualizarSaldo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId, dinero: nuevoEfectivo }),
        });

        const data = await response.json();
        if (response.ok) {
          await AsyncStorage.setItem('dinero', nuevoEfectivo.toString());
          setEfectivo(nuevoEfectivo);
          alert('Su movimiento fue procesado correctamente');
        } else {
          alert(data.message || 'Error al procesar el pago');
        }
      }
    } catch (error) {
      console.error('Error al actualizar el efectivo:', error);
    }
  };

  const handleIngreso = () => {
    const nuevaCantidad = parseFloat(cantidad);// Lo ingresado se convierte en un numero
    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida para ingresar.');
      return;
    }
    const nuevoEfectivo = efectivo + nuevaCantidad;

    actualizarEfectivo(nuevoEfectivo);

    setHistorial(prevHistorial => [
      ...prevHistorial,
      { tipo: 'Ingreso', monto: nuevaCantidad, fecha: obtenerFecha() }
    ]);

    setCantidad(''); //Vacia el recuadro de la cantidad que ingresa el usuario
  };

  const handleRetiro = () => {
    const nuevaCantidad = parseFloat(cantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida para retirar.');
      return;
    }
    if (nuevaCantidad > efectivo) {
      alert('Fondos insuficientes para realizar este retiro.');
      return;
    }
    const nuevoEfectivo = efectivo - nuevaCantidad;

    actualizarEfectivo(nuevoEfectivo);

    setHistorial(prevHistorial => [
      ...prevHistorial,
      { tipo: 'Retiro', monto: nuevaCantidad, fecha: obtenerFecha() }
    ]);

    setCantidad('');
  };

  const handleGenerarQR = () => {
    const nuevaCantidad = parseFloat(cantidad);
    if (nuevaCantidad <= 0 || isNaN(nuevaCantidad)) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }
    if (efectivo >= nuevaCantidad) {
      navigation.navigate('GenerarQR', { cantidad: nuevaCantidad });
    } else {
      alert('No tienes efectivo suficiente para generar un código QR.');
    }
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0, 
      routes: [{ name: 'Menu' }],
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>
        {item.tipo} - ${item.monto.toFixed(2)} - {item.fecha}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Efectivo: ${efectivo.toFixed(2)}</Text>

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

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Volver al menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historialContainer}>
          <Text style={styles.historialTitle}>Historial </Text>
          <FlatList
            data={historial}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainer}
          />
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
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  historialContainer: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200, 
    overflow: 'hidden', 
  },
  historialTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  transactionItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  flatListContainer: {
    flexGrow: 1,
  },
});
