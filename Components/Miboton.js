import React, {useRef, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated, StyleSheet, Text, View } from 'react-native';


function Miboton(props) {

    const [tamAnim, setTam] = useState(new Animated.Value(0));
    const [opacityAnim, setOpacity] = useState(new Animated.Value(1));

   
    const AnimBoton = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(tamAnim, {
                    toValue: 100,
                    duration: 200,
                    useNativeDriver: false 
                  }),
                Animated.timing(opacityAnim, {
                    toValue: 0.4,
                    duration: 200,
                    useNativeDriver: false 
                })
            ]),
            Animated.timing(tamAnim, {
                toValue: 0,
                duration:10,
                useNativeDriver: false 
            })
        ]).start(({finished }) => {
            setOpacity(new Animated.Value(1));
           });
    }

    return(
        <TouchableWithoutFeedback onPress={AnimBoton} onPressOut={props.pressMe}>
            <View style={[
                    styles.fondo,
                    {
                        backgroundColor: props.colorFondoNoPress,
                        width: props.ancho,
                        height: props.alto,
                        marginBottom:'5%'
                    }
                ]}>
                
                <Animated.View style={[
                    styles.anim,
                    {
                        backgroundColor:props.colorFondoPress,
                        width: tamAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']
                        }),
                        height: tamAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']
                        }),
                        opacity:opacityAnim,
                       
                    }
                    
                ]}>
                </Animated.View >

                <Text style = {[
                    styles.texto,
                    {
                        fontSize: props.tamLetra,
                        color: props.colorLetra
                    }
                ]}>
                    {props.texto}
                </Text>

            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({

    fondo:{
        backgroundColor:'#000',
        borderRadius:30,
        justifyContent: 'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 50,
            height: 50,
        },
        shadowOpacity:0.58,
        shadowRadius: 50.00,

        elevation: 11,
    },

    texto:{
        fontWeight: 'bold'
    },

    anim:{
        position:'absolute',
        borderRadius:50,
    }

})


export default Miboton;


// //solo la pruimera vez
    // useEffect(()=>{
    //     console.log('usando useEffect solo la primera vez')
    // }, [])


    // //solo si cambia un valor
    // useEffect(()=>{
    //     console.log('usando useEffect con un valor particular')
    // }, [valor1])


    // //cuando hay cualquier cambio
    // useEffect(()=>{
    //     console.log('usando useEffect con todos los cambios')
    // })


    // const [ancho, setAncho] = useState(0);

    // const incrementar = () => {
    //     setValor1(valor1+1);
    // }