import React, {useRef, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated, StyleSheet, Text, View } from 'react-native';


function Letras(props) {

    const opa= useRef(new Animated.Value(0)).current;


    useEffect(()=>{

            setTimeout(() =>{
               
                    Animated.timing(opa, {
                        toValue: 1,
                        duration:800,
                        useNativeDriver: false 
                    }).start();

              }, 2300);


    }, [opa])

    return(
        <Animated.View style={[
            styles.container,
            {
                width:'85%',
                opacity:opa
            }
        ]}>
            <Text style={styles.texto} ellipsizeMode='clip' numberOfLines={1} >Test de marcha estacionaria de 2 minutos </Text>
 
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems:'center'
    },
    texto:{   
        fontSize:15,
        color:'#000',
    },
  
  });
  


export default Letras;
