import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen.js';
import configuracion from './screens/configuracion.js';
import instrucciones from './screens/instrucciones.js';
import play from './screens/play.js';
import resultados from './screens/resultados.js';


const Stack = createStackNavigator();



class App extends React.Component {

  
    //loadModel = async () => {

      // const modelMano = {
      //   'manoOb.obj': require('./modelos/mano.obj'),
      //   'manoOb.mtl': require('./modelos/mano.mtl'),
      //   //'thomas.png': require('./thomas/thomas.png'),
      // };
      // };


  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Bienvenida' }} />
          <Stack.Screen name="Instrucciones" component={instrucciones} />
          <Stack.Screen name="Configuracion" component={configuracion} />
          <Stack.Screen name="Play" component={play} />
          <Stack.Screen name="Resultados" component={resultados} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;

//<Button title="Go back" onPress={() => navigation.goBack()} />