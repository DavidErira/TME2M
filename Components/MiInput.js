import React, {useRef, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated, StyleSheet, Text, View, ProgressViewIOSComponent } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 

function MiInput(props) {

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
               height:props.height,
               
            }
        ]}>
 
              
            <TextInput style={[
                styles.input,
                {
                    height:props.height,
                    borderColor:props.color,
                    backgroundColor:props.colorBag
                }
            ]} onChangeText={text => { onChangeText(text); }} value={value} onTouchStart={move} 
                ref={foco} underlineColorAndroid="transparent" secureTextEntry={props.secure}
                keyboardType={props.type} onFocus={inputRun() }>

            </TextInput>

            <View style={[
                styles.icono,
                {
                    marginTop:3
                }
            ]}>
                 <MaterialIcons name={props.icono} size={32} color={props.color} />
            </View>
            

            <Animated.Text style={[
                styles.texto,
                {
                   // marginTop:-12,
                    //fontSize:16,

                   // marginTop:5,
                    //fontSize:23,
                    color:props.color,
                    backgroundColor:props.colorBag,
                    marginTop:ClickAnim.interpolate({
                        inputRange: [-12, 5],
                        outputRange: [3, -12]
                    }),

                    fontSize:ClickAnim.interpolate({
                        inputRange: [-12, 5],
                        outputRange: [18, 15]
                    })

                }
            ]} onPress={move}>{props.texto}</Animated.Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
       
    },
    texto:{  
        marginStart:45,
        position:'absolute',
      
    },
    input:{
        borderWidth:2,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        backgroundColor:'#A364B7',
        width:'100%',
        color:'#fff',
        fontSize:20,
        paddingStart:35
    },

    icono:{
        position:'absolute',
        marginStart:5,  
        paddingStart:2,
        paddingEnd:2,
    }
  
  });
  


export default MiInput;