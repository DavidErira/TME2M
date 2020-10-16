
import React, {useRef, useState, useEffect} from 'react';
import { Animated, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

import Miboton from'../Components/Miboton.js';
import AppName from'../Components/AppName.js';
import Letras from'../Components/Letras.js';
import Login from'../Components/Login.js';

function HomeScreen(props) {

    const position = useRef(new Animated.Value(-10)).current;
    const opaLogin = useRef(new Animated.Value(0)).current;
    
    const [iniciado, setIniciado] = useState(true);
    const [listo, setListo] = useState(true);

    const [correo,setCorreo] = useState('')
    const [password,setPassword] = useState('')

    const [okCorreo,setOkCorreo] = useState(false);
    const [okPassword,setOkPassword] = useState(false);

    const animarPos = () => {

        Animated.sequence([
            Animated.timing(position, {
                toValue: 53,
                duration:500,
                useNativeDriver: false 
            }),
            Animated.timing(opaLogin, {
                toValue: 1,
                duration:200,
                useNativeDriver: false 
            })

        ]).start();

        setIniciado(false);
        setListo(false);
    
    }

    const irInstruc = () =>{
        setTimeout(() =>{
            props.navigation.navigate('Instrucciones')
        }, 310);
    }


    const [assetsLoaded, setAssetsLoaded] = useState(false);

    async function loading(){
        await Font.loadAsync({
               'Quicksand-Bold': require('../fonts/Quicksand-Bold.ttf'),
             });
        setAssetsLoaded(true);
    }

    useEffect(()=>{
        loading();
    }, [])
    
 

    // handleInput = (text) => {
    //     this.setState({ valor: text })
    //     console.log(text);
    // }

            
   
    if(assetsLoaded){
        return (

            <LinearGradient colors={['#15B2DA', '#15B2DA']} start={[0.8,0]} end={[1,0.5]} style={styles.containerGeneral}>

            

                <View style={styles.baseTitulo}>
                   

                    <Animated.View style={[
                                styles.boardLogin,
                                {
                                    opacity: opaLogin
                                }

                            ]}>

                                <LinearGradient colors={['#A364B7', '#A364B7']} start={[0.8,0]} end={[1,0.5]} style={styles.baseLogin}>
                                    
                                    <Login ok={okCorreo} setok={setOkCorreo} valor ={correo} setvalor={setCorreo} width = '90%' height={38} texto='Correo electrónico' type = 'email-address' icono = 'email'/>

                                    <View style={{height:30}}>
                                   
                                    </View>

                                    <Login ok={okPassword} setok={setOkPassword}  valor ={password} setvalor={setPassword} width = '90%' height={38} texto='Contraseña' secure={true} icono = 'vpn-key'/>

                                 </LinearGradient>

                    </Animated.View>
               

 
                    <Animated.View style={[
                        styles.titulo,
                        {
                            marginTop:position.interpolate({
                                inputRange: [-10, 53],
                                outputRange: ['55%', '-8%']
                            })
                        }
                    ]}>

                        <Text style={styles.bienvenida}> Bienvenido a </Text>

                        <AppName />

                        <View style={{width:'100%', paddingStart:'15%',paddingTop:5}}>
                                <Letras />
                        </View>

                    </Animated.View>

                    
                </View>

               
                <View style={styles.botones}>
                    <Miboton   texto= {iniciado ? "INGRESAR" : "SIGUIENTE"}  colorFondoNoPress={ listo  ? '#fff': ( (okCorreo && okPassword) ? '#fff': '#B2B2B2') }
                            colorFondoPress='#A364B7' ancho ={150} alto={35}   
                            tamLetra={25} colorLetra='#A364B7' pressMe = {(okCorreo && okPassword) ? irInstruc : animarPos} />
                </View>
            
          </LinearGradient>
            );
    }
    else{
        return (
            <View style={styles.containerGeneral}>
            </View>
            );
    }

    }
    

  
const styles = StyleSheet.create({


    containerGeneral: {
      flex: 1,
      //backgroundColor: '#15B2DA',
     
    },

        baseTitulo:{
            flex:2,
            alignItems:'center',
        // backgroundColor:'red'
        },

            titulo:{
                width:'110%',
                height:230,
                alignItems:'center',
                justifyContent: 'center',
                //backgroundColor:'tr',

            },

                bienvenida:{
                    fontSize: 40,
                    color:'#fff',
                    fontFamily: 'Quicksand-Bold'
                },

            boardLogin:{
                //backgroundColor:'#6d6d6d',
                width:'100%',
                alignItems:'center',
                justifyContent: 'center',
                position:'absolute',
                marginTop:'55%',
               
            },

        botones:{
            flex:1,
            alignItems:'center',
            flexDirection:'column-reverse',
            marginBottom:0
        },

      

        baseLogin:{
           // backgroundColor:'#A364B7',
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
            elevation:17,
            width:'80%',
            height:150
        }

  });




  export default HomeScreen;