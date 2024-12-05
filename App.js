import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/menu'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen 
          name="Menu" component={Menu}  options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
