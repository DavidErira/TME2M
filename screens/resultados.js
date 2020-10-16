import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 

import Miboton from'../Components/Miboton.js';

function resultados({route, navigation}) {

    const {PPD} = route.params
    const {PPI} = route.params

    return(
        <View style = {styles.containerGeneral}>

            <View style = {styles.containerTitulo}>
                <AntDesign name="barchart" size={36} color="#fff" />
                <Text style = {styles.textTitulo}>Resultados</Text>
                
            </View>
            
            <View style={[
                styles.containerResult,
                {
                    marginTop:'15%'
                }
            ]}>
                <Text style={styles.texto}> El numero de veces que se levantó la pierna derecha hasta la marca es: </Text>
                <Text style={[
                    styles.texto,
                    {
                        fontSize:50
                    }
                    ]}>{PPD}</Text>
            </View>

            <View style={[
                styles.containerResult,
                {
                    marginTop:'10%'
                }
            ]}>
                <Text style={styles.texto}> El numero de veces que se levantó la pierna izquierda hasta la marca es: </Text>
                <Text style={[
                    styles.texto,
                    {
                        fontSize:50
                    }
                    ]}>{PPI}</Text>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    containerGeneral: {
      flex: 1,
      backgroundColor: '#15B2DA',
      alignItems:'center'
     
    },

    containerResult:{
        backgroundColor:'#A364B7',
        width:'80%',
        height:'30%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        elevation:17
    },

    texto:{
        width:'85%',
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },

    containerTitulo:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },

    textTitulo:{
        color:'#fff',
        fontSize:36,
        fontWeight:'bold',
        marginStart:7
    }
    
})


export default resultados;