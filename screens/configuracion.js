
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

import MiInput from'../Components/MiInput.js';
import Miboton from'../Components/Miboton.js';




function configuracion({ route, navigation }){

        const [medida,setMedida] = useState('');
        const [okMedida,setOkMedida] = useState(false);

        const [ip1,setIp1] = useState('');
        const [okIp1,setOkIp1] = useState(false);

        const [ip2,setIp2] = useState('');
        const [okIp2,setOkIp2] = useState(false);

        const irJuego = () =>{
            setTimeout(() =>{
                navigation.navigate('Play',{
                    DIP1:ip1,
                    DIP2:ip2
                })
            }, 310);
        }

        // const {valor1} = route.params

        // useEffect(()=>{
        //     console.log(valor1)
        // }, [])



        return (

           

            
            <View style={styles.containerGeneral}>
                 <ScrollView style={{flex:1}}>
                <View style={styles.tituloView}>

                    <View style={styles.subtitle}>
                        <Text style={styles.texTitulo}> Configuración</Text>
                        <View style ={{marginTop:3}}> 
                            <MaterialIcons name='settings' size={34} color="#fff" />
                        </View>
                        
                    </View>


                    <View  style={styles.peticionView}>

                    
                        <Text style={styles.textPeticion} >Por favor ingresar la medida del punto medio entre la cresta iliaca y el borde superior de la patela </Text>
                   
                        <View  style={styles.inputConte} >
                             <MiInput color='#fff' width='90%' height={35} valor={medida} setvalor={setMedida} ok={okMedida} setok={setOkMedida} texto='Medida' colorBag ='#A364B7' type = 'decimal-pad' icono = 'edit'/>                   
                        </View>
                    </View>

                    <View style={{height:10}}>

                    </View>

                    <View style={styles.subtitle}>
                        <Text style={styles.texTitulo}> Conectividad</Text>
                        <View style ={{marginTop:3}}> 
                            <Ionicons name="md-wifi" size={34} color="#fff" />
                        </View>
                        
                    </View>

                    <View  style={styles.peticionView}>

                        <Text style={styles.textPeticion} >Por favor ingresa la dirección ip de cada sensor</Text>

                         <View  style={styles.inputConte} >
                            <MiInput color='#fff' width='90%' height={35} valor={ip1} setvalor={setIp1} ok={okIp1} setok={setOkIp1} texto='IP Sensor pierna derecha' colorBag ='#A364B7' type = 'decimal-pad' icono = 'wifi-tethering'/>                   
                        </View> 

                        <View  style={styles.inputConte} >
                            <MiInput color='#fff' width='90%' height={35} valor={ip2} setvalor={setIp2} ok={okIp2} setok={setOkIp2} texto='IP Sensor pierna izquierda' colorBag ='#A364B7' type = 'decimal-pad' icono = 'wifi-tethering'/>                   
                        </View> 

                    </View>
                   
                   
                   

                    <View style={{marginTop:20}}>
                        <Miboton   texto= {"SIGUIENTE"}  colorFondoNoPress='#fff' 
                                    colorFondoPress='#A364B7' ancho ={150} alto={50}   
                                    tamLetra={25} colorLetra='#BC54FF' pressMe={irJuego} />  
                    </View>
                    
                   
                </View>

                </ScrollView>
            </View>

           
            );  
    
  }

  
const styles = StyleSheet.create({

    containerGeneral: {
      flex: 1,
      backgroundColor: '#15B2DA',
     height:'100%'
    },
    inputConte:{
        
        width:'100%',
        alignItems:'center',
        marginBottom:20
    },

    texTitulo:{
        color:'#fff',
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold', 
    },


    tituloView:{
        marginTop:'5%',
        marginStart:'5%',
        alignItems:'center',
        width:'90%',
    },

    peticionView:{
        marginTop:5,
        backgroundColor:'#A364B7',
        width:'95%',
        borderRadius:10,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop:15,
        elevation:17
    },

    textPeticion:{
        color:'#fff',
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        marginBottom:25
    },

    subtitle:{
        width:'90%',
        flexDirection: 'row-reverse',
       // backgroundColor:'#000',
        alignContent:'center'
    },
    

    
  });




  export default configuracion;