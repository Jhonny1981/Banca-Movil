import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu';
import Register from './components/Register';
import Login from './components/Login';
import Inicio from './components/Inicio';
import GenerarQR from './components/GenerarQR';  

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Menu"
        screenOptions={{
          animation: 'slide_from_bottom', 
          detachPreviousScreen: true,
        }}
      >
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{
            title: 'Volver al menu',
            headerTransparent: true,
            headerStyle: { backgroundColor: 'rgba(0, 123, 255, 1)' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff', 
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: 'Volver al menu',
            headerTransparent: true,
            headerStyle: { backgroundColor: 'rgba(0, 123, 255, 1)' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{
            title: 'Inicio',
            headerStyle: { backgroundColor: '#007bff' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="GenerarQR" 
          component={GenerarQR}  
          options={{
            title: 'Generar Código QR',
            headerStyle: { backgroundColor: '#007bff' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


