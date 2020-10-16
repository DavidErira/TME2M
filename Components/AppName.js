import React, {useRef, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Animated, StyleSheet, Text, View } from 'react-native';

function AppName(props) {

    const anchoAnim= useRef(new Animated.Value(0)).current;
    const nameAnim= useRef(new Animated.Value(0)).current;
    const opaApp= useRef(new Animated.Value(0)).current;

    useEffect(()=>{

            setTimeout(() =>{
                Animated.sequence([
                    Animated.timing(anchoAnim, {
                        toValue: 100,
                        duration:500,
                        useNativeDriver: false 
                    }),
                    Animated.timing(nameAnim, {
                        toValue: 100,
                        duration:700,
                        useNativeDriver: false 
                    }),
                    Animated.timing(opaApp, {
                        toValue: 1,
                        duration:500,
                        useNativeDriver: false 
                    })
                ]).start();

              }, 600);

    }, [anchoAnim])

    return(
        <Animated.View style={[
            styles.container,
            {
                width:anchoAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '80%']
                }),

                height:anchoAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 90]
                })
            }
        ]}>

            <Animated.View style={[
                styles.nameCont,
                {
                    width:nameAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '68%']
                    })
                }
                ]} >
                    
                <Text style={styles.texto} ellipsizeMode='clip' numberOfLines={1} > TME2M</Text>
            </Animated.View>

            <Animated.Text style={[
                styles.app,
                {
                    opacity:opaApp
                }
            ]}>APP</Animated.Text>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'#A364B7',
        borderRadius:30,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 50,
            height: 50,
        },
        shadowOpacity:0.58,
        shadowRadius: 50.00,
        elevation: 11,
    },
    nameCont:{
        backgroundColor:'#fff',
        borderRadius:24,
        borderBottomRightRadius:37,
        borderTopRightRadius:37,
        height:'84%',
        marginStart:'2.5%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    texto:{
        marginBottom:10,
        fontSize: 55,
        color:'#A364B7',
        fontFamily: 'Quicksand-Bold',
    },
    app:{
        fontFamily: 'Quicksand-Bold',
        color:'#fff',
        fontSize: 40,
        marginBottom:5,
        marginStart:'3%',
    }
  });
  


export default AppName;


//width:320,