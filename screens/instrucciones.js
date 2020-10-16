import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import Miboton from'../Components/Miboton.js';

function instrucciones(props) {

    const irConfig = () =>{
        setTimeout(() =>{
            props.navigation.navigate('Configuracion')
        }, 310);
    }

            return (
                <View style={styles.containerGeneral}>
                    
                  
                    <LinearGradient colors={['#15B2DA', 'transparent']} start={[0, 0.9]} style={styles.tituloView}>
                            <Text style={styles.titulo}>Descripción del Test de marcha estacionaria de dos minutos <Text style={{color: '#A364B7', fontWeight: 'bold'}}>(TME2M)</Text> </Text>
                    </LinearGradient>
                    

                    <ScrollView style={styles.datos}>
                       
                       
                        <View style={styles.instruccion}>
                            <Text style={styles.textInstrucciones}>
                               <Text style={{color: '#A364B7', fontWeight: 'bold'}}>1.</Text> Primero: se realizará la medición del punto medio entre la cresta iliaca y el borde superior de la patela.
                            </Text>
                        </View>     

                        <View style={styles.instruccion}>
                              <Text style={styles.textInstrucciones}>
                              <Text style={{color: '#A364B7', fontWeight: 'bold'}}>2.</Text> De acuerdo con la medida realizada en el item anteriores, Se debe ubicar el altimetro y ajustar de acuerdo al participante.
                            </Text>
                        </View>    

                        <View style={styles.instruccion}>
                           <Text style={styles.textInstrucciones}>
                           <Text style={{color: '#A364B7', fontWeight: 'bold'}}>3.</Text> En reposo de 5 minutos, se realizará en posicion sedente medicion de Fc, Fr, disnea, Tensión arterial (TA) y saturacion de oxígeno.
                            </Text>
                        </View>  

                        <View style={styles.instruccion}>
                            <Text style={styles.textInstrucciones}>
                            <Text style={{color: '#A364B7', fontWeight: 'bold'}}>4.</Text> El altímetro se colocará al lado derecho y se le dará la instrucción para el inicio de la prueba.
                            </Text>
                        </View>  

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>5.</Text> Se explicará la prueba y los comando, ¨ahora¨ para iniciar y ¨detente¨ para finalizar la prueba.
                            </Text>
                        </View>   

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>6.</Text> Luego de preparar el cronómetro y el altímetro, se dará inicio con el comando ¨ahora¨.
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>7.</Text> El participante deberá ¨marchar¨ en el sitio sin desplazarse anteriormente, comenzando con la pierna derecha y completando tantos pasos como sea posible durante dos minutos. Aunque ambas rodillas deben elevarse a la altura correcta para ser contados, solo se contará el número de veces que eleva la rodilla derecha. Si el participante no consigue mantener la elevacion de las dos piernas, se debe indicar disminuir la velocidad o parar y/o reiniciar hasta completar los dos minutos. Para ayudar con el ritmo, se debe informar al participante pasado 1 minuto y cuando falten 30 segundos.
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>8.</Text> Para la prueba se requieren dos evaluadores (uno dirige la prueba y el otro observa)
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>9.</Text> Al finalizar los dos minutos, en el sitio, se medirá FC, FR, TA y SpO2 y disnea y se indicara caminar lentamente durante 1 minuto.
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>10.</Text> Despues del minuto de desaceleración, en posición sedente se medirá nuevamente FC, FR, SpO2, TA y disnea.
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>11.</Text> El puntaje es el número total que la rodilla derecha alcanza la altura mínima.
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>12.</Text> Cinco minutos después de reposo se medirá nuevamente FC, FR, SpO2,TA Y disnea.
                            </Text>
                        </View> 

                        <View style={styles.instruccion}>
                             <Text style={styles.textInstrucciones}>
                             <Text style={{color: '#A364B7', fontWeight: 'bold'}}>13.</Text> La segunda prueba será realizada 30 minutos después del miunto de desaceleración y si los signos vitales llegan a valores basales.
                            </Text>
                        </View> 
                                 
                        <View style={styles.botonView}>
                            <Miboton   texto= {"SIGUIENTE"}  colorFondoNoPress='#fff' 
                                colorFondoPress='#A364B7' ancho ={150} alto={45}   
                                tamLetra={25} colorLetra='#A364B7' pressMe={irConfig} />
                       
                        </View>

                    </ScrollView>
    
                </View>
              );  
   
    
  }

  
const styles = StyleSheet.create({

    containerGeneral: {
      flex: 1,
      backgroundColor: '#15B2DA',
     
    },

        tituloView:{
            height:'25%',
            alignItems:'center',
            justifyContent:'center',
            elevation:1
        },

            titulo:{
                fontSize:28,
                fontWeight:'bold', 
                textAlign:'center',
                color:'#fff',
                marginStart:30,
                marginEnd:30
            },

        datos:{
            marginTop:'-2%',
            marginStart:'2%',
            width:'96%',
           
        },

         instruccion:{
                marginTop:'6%',
               // backgroundColor:'#BC54FF',
              
                width:'90%',
                marginStart:'5%',
                borderRadius:10,
                //borderColor:'#BC54FF',
                //borderWidth:4,
                justifyContent:'center',
                backgroundColor:'#17A4C8',
            
            },
            textInstrucciones:{
                color:'#fff',
                fontSize:20,
                marginStart:25,
                marginEnd:25,
                marginTop:10,
                marginBottom:10
            },

            botonView:{
                width:'100%',
                alignItems:'center',
                height:150,
                justifyContent:'center'
            }

  });




  export default instrucciones;