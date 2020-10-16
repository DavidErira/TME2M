import React, {useRef, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



function Login(props) {

    const ClickAnim= useRef(new Animated.Value(-12)).current;
    const foco= useRef(null);
    
    const [value, onChangeText] = [props.valor, props.setvalor]
    const [ok, setOk] = [props.ok, props.setok]

    const move = () => {
        Animated.timing(ClickAnim, {
            toValue: 5,
            duration:200,
            useNativeDriver: false 
        }).start();

        foco.current.focus();
    }

    function inputRun() {

        if (value != ''){
            setOk(true);
        }

        else{
            setOk(false);
        }
       
        
    }

    return(
        <View style={[
            styles.container,
            {
               width: props.width,
               height:props.height
            }
        ]}>
 
              
            <TextInput style={[
                styles.input,
                {
                    height:props.height
                }
            ]} onChangeText={text => { onChangeText(text); }} value={value} onTouchStart={move} 
                ref={foco} underlineColorAndroid="transparent" secureTextEntry={props.secure}
                keyboardType={props.type} onFocus={inputRun() }>

            </TextInput>

            <Animated.View style={[
                styles.icono,
                {
                    marginTop:7
                }
            ]}>
                 <MaterialIcons name={props.icono} size={24} color="white" />
            </Animated.View>
            
            

            <Animated.Text style={[
                styles.texto,
                {
                    marginTop:ClickAnim.interpolate({
                        inputRange: [-12, 5],
                        outputRange: [5, -12]
                    }),

                    fontSize:ClickAnim.interpolate({
                        inputRange: [-12, 5],
                        outputRange: [20, 16]
                    })

                }
            ]} onPress={move}>{props.texto}</Animated.Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        //alignItems:'center',
       
    },
    texto:{
        marginStart:38,  
        paddingStart:2,
        paddingEnd:2,
        textAlign:'center',
        color:'#fff',
        backgroundColor:'#A364B7',
        position:'absolute'
    },
    input:{
        borderColor:'#fff',
        borderWidth:2,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        backgroundColor:'#A364B7',
        width:'100%',
        color:'#fff',
        fontSize:20,
        paddingStart:28
    },
    icono:{
        position:'absolute',
        marginStart:7,  
        paddingStart:2,
        paddingEnd:2,
    }
  
  });
  


export default Login;