import { StatusBar } from 'expo-status-bar';
import ExpoGraphics, { GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from 'expo-three';
import React, {useRef, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, StyleSheet, Text, View, PanResponder} from 'react-native';
import CaptureTouch from'../Components/CaptureTouch.js';
import { MaterialIcons } from '@expo/vector-icons'; 

const util = require('util');

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Miboton from'../Components/Miboton.js';

class Playclass extends React.Component  {

  constructor(){
    super();

    this.state ={
      rotGeneralX:0,
      rotGeneralY:0,
      connectionDer:'',
      connectionIz:'',
      rodillaDer:'',
      rodillaIz:'',
      tobilloDer:'',
      tobilloIz:'',
      connectionDerOk:false,
      connectionIzOk:false,
      IpDer:'',
      IpIz:'',
      tobilloDerAA:'',
      tobilloIzAA:'',
      contoPD:true,
      contoPI:true,
      pasosPD:0,
      pasosPI:0,
      navi:''
    }

  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
  
    },
    onPanResponderMove: (event, gesture) => {
      console.log('posicion del touch --------------')
      this.state.rotGeneralX = this.state.rotGeneralX + gesture.dx;
      this.state.rotGeneralY = this.state.rotGeneralY + gesture.dy;


   },
    onPanResponderRelease: () => {

    }
  });


  contarPD (){

    if(this.state.tobilloDer > 60 && this.state.contoPD){
      this.state.contoPD = false
      this.state.pasosPD += 1;
      console.log('pierna derecha ----------------')
      console.log(this.state.pasosPD)
    }
  
    if(this.state.tobilloDer < 40){
      this.state.contoPD = true
    }
  
  }

  contarPI (){

    if(this.state.tobilloIz > 60 && this.state.contoPI){
      this.state.contoPI = false
      this.state.pasosPI += 1;
      console.log('pierna izquierda ----------------')
      console.log(this.state.pasosPI)
    }

    if(this.state.tobilloIz < 40){
      this.state.contoPI = true
    }
  
  }

  conectarSocket(ip,pierna){

    const connection= new WebSocket('ws://'+ip+':80/');

      connection.onopen = () => {
        connection.send('Listo :)');
        connection.send('ON');
        
        if(pierna==1){
          this.setState({
            connectionDerOk:true,
            connectionDer:connection
          })
        }

        if(pierna==2){
          this.setState({
            connectionIzOk:true,
            connectionIz:connection
          })
        }
       
     };

    
     connection.onmessage = (e) => {

      if (pierna == 1){

        this.setState({
          rodillaDer: (e.data)-85,
          tobilloDer: -((e.data)-85)
        })

        this.contarPD();
      }

      if (pierna == 2){

        this.setState({
          rodillaIz: (e.data)-80,
          tobilloIz: -((e.data)-80)
        })

        this.contarPI();

      }
       
        //console.log(this.state.rodillaDer)
     };

     connection.onerror = (error) => { 
       console.log('error')
    };

    connection.onclose = (e) => {

      console.log('close')
      if(pierna==1){
        this.setState({
          connectionDerOk:false
        })
      }

      if(pierna==2){
        this.setState({
          connectionIzOk:false
        })
      }

    };

  }
  

  async componentDidMount(){

    console.log("Iniciando aplicación");

    const { ip1 } = this.props;
    const { ip2 } = this.props;

    const {navigation} = this.props;

    console.log(ip1);
    console.log(ip2);

    this.setState({
      IpDer:ip1,
      IpIz:ip2,
      navi:navigation
    })


    // this.setState({
    //   rodillaDer: -60,
    //   tobilloDer: 60
    // })

     //this.conectarSocket(ip1,1);
     //this.conectarSocket(ip2,2);
  }

  
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {

    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    //this.renderer.setClearColor(0x5f5f55)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    this.camera.position.z = 4.5;
    this.camera.position.x = 0;
    this.camera.position.y = -0.4;


    // creamos un cubo de ejemplo
    const geometry = new THREE.BoxGeometry(2.5,0.1,0.1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x144CF3,
    });

    this.cube = new THREE.Mesh(geometry, material);
    //this.scene.add(this.cube);
    //this.cube.position.z = -5;
    

    //luces
    this.scene.add(new THREE.AmbientLight(0xB8FFFF, 0.5));
    this.scene.add(new THREE.AmbientLightProbe(0xB8FFFF, 0.9));
    const light = new THREE.DirectionalLight(0xB8FFFF, 0.2);
    light.position.set(5, 5, 5);
    this.scene.add(light);
    //---------------

    await this.loadModel();

  };


  loadModel = async () => {

    // cargando modelos --------------------------------------------------------------------------------------------------------------------
    const modelTronco = {
            'troncoOb.obj': require('../modelos/tronco.obj'),
            'troncoOb.mtl': require('../modelos/tronco.mtl'),
            //'thomas.png': require('./thomas/thomas.png'),
          };
    /// Load model!
    const meshTronco = await ExpoTHREE.loadAsync(
      [modelTronco['troncoOb.obj'], modelTronco['troncoOb.mtl']],
      null,
      modelTronco,
    );

    /// Update size and position
    ExpoTHREE.utils.scaleLongestSideToSize(meshTronco, 3);
    ExpoTHREE.utils.alignMesh(meshTronco, { y: 0.7, x:0.5});
  
    
    const modelMusloDer = {
      'musloDerOb.obj': require('../modelos/musloDer.obj'),
      'musloDerOb.mtl': require('../modelos/musloDer.mtl'),
    };

    /// Load model!
    const meshMusloDer = await ExpoTHREE.loadAsync(
    [modelMusloDer['musloDerOb.obj'], modelMusloDer['musloDerOb.mtl']],
    null,
    modelMusloDer,
    );

    /// Update size and position
    ExpoTHREE.utils.scaleLongestSideToSize(meshMusloDer, 1.5);
    ExpoTHREE.utils.alignMesh(meshMusloDer, { y:0, x:0});


    const modelMusloIz = {
      'musloIzOb.obj': require('../modelos/musloIz.obj'),
      'musloIzOb.mtl': require('../modelos/musloIz.mtl'),
    };

    /// Load model!
    const meshMusloIz = await ExpoTHREE.loadAsync(
    [modelMusloIz['musloIzOb.obj'], modelMusloIz['musloIzOb.mtl']],
    null,
    modelMusloIz,
    );

    /// Update size and position
    ExpoTHREE.utils.scaleLongestSideToSize(meshMusloIz, 1.5);
    ExpoTHREE.utils.alignMesh(meshMusloIz, { y:0, x:0});

    const modelPiernaDer = {
      'piernaDerOb.obj': require('../modelos/piernaDer.obj'),
      'piernaDerOb.mtl': require('../modelos/piernaDer.mtl'),
    };

    /// Load model!
    const meshPiernaDer = await ExpoTHREE.loadAsync(
    [modelPiernaDer['piernaDerOb.obj'], modelPiernaDer['piernaDerOb.mtl']],
    null,
    modelPiernaDer,
    );

    /// Update size and position
    ExpoTHREE.utils.scaleLongestSideToSize(meshPiernaDer, 1.5);
    ExpoTHREE.utils.alignMesh(meshPiernaDer, { y:0.1, x:0});

    const modelPiernaIz = {
      'piernaIzOb.obj': require('../modelos/piernaIz.obj'),
      'piernaIzOb.mtl': require('../modelos/piernaIz.mtl'),
    };

    /// Load model!
    const meshPiernaIz = await ExpoTHREE.loadAsync(
    [modelPiernaIz['piernaIzOb.obj'], modelPiernaIz['piernaIzOb.mtl']],
    null,
    modelPiernaIz,
    );

    /// Update size and position
    ExpoTHREE.utils.scaleLongestSideToSize(meshPiernaIz, 1.5);
    ExpoTHREE.utils.alignMesh(meshPiernaIz, { y:0.1, x:0});

    //----------------------------------------------------------------------------------------------------------------------------------

    // objetos de pierna derecha --------------------------------------------------------------
    this.subTobilloDerCont = new THREE.Object3D();
    this.subTobilloDerCont.add(meshPiernaDer);
    
    this.subTobilloDerCont.position.y = -1.45;
    this.subTobilloDerCont.position.x = -0.07;
    this.subTobilloDerCont.rotation.x = 0/57.2958;
    

    this.subPiernaDerCont = new THREE.Object3D();
    this.subPiernaDerCont.add(meshMusloDer);
    this.subPiernaDerCont.add(this.subTobilloDerCont);
    this.subPiernaDerCont.position.y = 0.2
    
    this.piernaDerContenedor = new THREE.Object3D();
    this.piernaDerContenedor.add(this.subPiernaDerCont)
    this.piernaDerContenedor.position.y = -0.42
    this.piernaDerContenedor.position.x = -0.04
    //------------------------------------------------------------------------------------------


    // objetos de pierna izquierda --------------------------------------------------------------
    this.subTobilloIzCont = new THREE.Object3D();
    this.subTobilloIzCont.add(meshPiernaIz);
    
    this.subTobilloIzCont.position.y = -1.45;
    this.subTobilloIzCont.position.x = -0.07;
    this.subTobilloIzCont.rotation.x = 0/57.2958;
    

    this.subPiernaIzCont = new THREE.Object3D();
    this.subPiernaIzCont.add(meshMusloIz);
    this.subPiernaIzCont.add(this.subTobilloIzCont);
    this.subPiernaIzCont.position.y = 0.2
    
    this.piernaIzContenedor = new THREE.Object3D();
    this.piernaIzContenedor.add(this.subPiernaIzCont)
    this.piernaIzContenedor.position.y = -0.42
    this.piernaIzContenedor.position.x = 0.67
    this.piernaIzContenedor.rotation.x = 0/57.2958;
     //----------------------------------------------------------------------------------------


    this.cuerpoContenedor = new THREE.Object3D();
    this.cuerpoContenedor.add(meshTronco)
    this.cuerpoContenedor.add(this.piernaDerContenedor)
    this.cuerpoContenedor.add(this.piernaIzContenedor)

    this.cube.position.x = 0
    this.cube.position.z = 1
    this.cube.position.y = -0.65
    this.cuerpoContenedor.add(this.cube)

    this.cuerpoContenedor.position.y = 0.5
    //this.cuerpoContenedor.rotation.y = 45/57.2958;

    this.scene.add( this.cuerpoContenedor)
  
  };

  onRender = delta => {


    this.cuerpoContenedor.rotation.y = ((this.state.rotGeneralX)/20)/57.2958;
    this.cuerpoContenedor.rotation.x = ((this.state.rotGeneralY)/20)/57.2958;

    this.piernaDerContenedor.rotation.x = (this.state.rodillaDer)/57.2958;
    this.piernaIzContenedor.rotation.x = (this.state.rodillaIz)/57.2958;

    this.subTobilloIzCont.rotation.x = (this.state.tobilloIz)/57.2958;
    this.subTobilloDerCont.rotation.x = (this.state.tobilloDer)/57.2958;

    this.renderer.render(this.scene, this.camera);
  };


  render(){

    const conectarIPDer = () => {
      if(this.state.connectionDerOk){
        this.state.connectionDer.close();
      }
      else{
        this.conectarSocket(this.state.IpDer,1);
      }
      
    }

    const conectarIPIz = () => {
      if(this.state.connectionIzOk){
        this.state.connectionIz.close();
      }
      else{
        this.conectarSocket(this.state.IpIz,2);
      }
      
    }

    const irResultados = () => {
      console.log('fiiiin')

      setTimeout(() =>{
        this.state.navi.navigate('Resultados',{
          PPD:this.state.pasosPD,
          PPI:this.state.pasosPI
        })
      }, 310);

    }


    return (
      <>
        <View
        {...this.panResponder.panHandlers}
        style={styles.container}
        >

          <ExpoGraphics.View
            onContextCreate={this.onContextCreate}
            onRender={this.onRender}
          />

        </View>

        <View style={{height:0 , flexDirection:'row-reverse'}}>

          <View style ={styles.contFin}>
            <Miboton   texto= 'FIN'  colorFondoNoPress='#17A4C8'
                                colorFondoPress='#A364B7' ancho ={60} alto={60}   
                                tamLetra={22} colorLetra='#FFF' pressMe = {irResultados} />
          </View>
         
        </View>
        

        <View style = {styles.botones}>

          <View style = {styles.cajonIz}>
            <Text style = {styles.sensorIz}>Sensor pierna izquierda</Text>
            <TouchableWithoutFeedback onPressOut={conectarIPIz}>
                {this.state.connectionIzOk ?
                <View style={styles.boton1}>
                  <MaterialIcons name="wifi-tethering" size={50} color="#fff" />
                </View>
                :
                <View style={styles.boton2}>
                  <MaterialIcons name="portable-wifi-off" size={50} color="#fff" />
                </View>
                }
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.pasosDer}>
              <Text style={styles.pasosDerT} >{this.state.pasosPD}</Text>
          </View>

          <View style={styles.pasosIz}>
            <Text style={styles.pasosIzT}  >{this.state.pasosPI}</Text>
          </View>

          <View style = {styles.cajonDer}>
            <Text style = {styles.sensorDer}>Sensor pierna derecha</Text>
            <TouchableWithoutFeedback onPressOut={conectarIPDer}>
                {this.state.connectionDerOk ?
                <View style={styles.boton1}>
                  <MaterialIcons name="wifi-tethering" size={50} color="#fff" />  
                </View>
                :
                <View style={styles.boton2}>
                  <MaterialIcons name="portable-wifi-off" size={50} color="#fff" />
                </View>
                }
            </TouchableWithoutFeedback>
          </View>
          
        </View>
    
      </>
    );
  }

}


const styles = StyleSheet.create({

  container:{
    flex:6,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },

  botones:{
    flexDirection: 'row',
    flex:1,
    width: "100%",
    justifyContent: 'space-between',
    //borderRadius:20,
    //backgroundColor:'#17A4C8',
    //marginStart:'5%',
    //marginBottom: 20,
    //elevation:17,
  },

  boton1:{
    marginTop:8,
    marginStart:27,
    width:'52%',
    height:'45%',
    backgroundColor:'#35D39E',
    borderRadius:30,
    alignContent:'center',
    justifyContent: 'center',
    elevation:10,
    paddingStart:5,
  },
  
  boton2:{
    marginTop:8,
    marginStart:27,
    width:'52%',
    height:'45%',
    backgroundColor:'#D33562',
    borderRadius:30,
    alignContent:'center',
    justifyContent: 'center',
    elevation:10,
    paddingStart:5,
  },

  textoBoton:{
    fontSize:20,
    textAlign:'center'
  },

  sensorIz:{
    width:115,
    textAlign:'center',
    marginTop:10,
    fontSize:15,
    fontWeight:'bold',
    color:'#fff',
    //marginStart:34
  },

  sensorDer:{
    width:115,
    textAlign:'center',
    marginTop:10,
    fontSize:15,
    fontWeight:'bold',
    color:'#fff',
    //marginStart:34
  },

  cajonDer:{
    marginEnd:5,
    marginTop:'-10%',
    marginBottom:'2%',
    backgroundColor:'#17A4C8',
    alignContent:'center',
    justifyContent:'center',
    borderBottomLeftRadius:60,
    borderBottomRightRadius:60,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    elevation:10
  },

  cajonIz:{
    marginStart:5,
    marginTop:'-10%',
    marginBottom:'2%',
    backgroundColor:'#17A4C8',
    alignContent:'center',
    justifyContent:'center',
    borderBottomLeftRadius:60,
    borderBottomRightRadius:60,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    elevation:10
  },

  pasosDer:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'#A364B7',
   
    alignItems:'center',
    justifyContent:'center'
  },

  pasosIz:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'#A364B7',
    
    alignItems:'center',
    justifyContent:'center'
  },

  pasosDerT:{
    textAlign:'center',
    fontSize:20,
    color:'#fff'
  },

  pasosIzT:{
    textAlign:'center',
    fontSize:20,
    color:'#fff'
  },

  contFin:{
    //backgroundColor:'#17A4C8',
    //width:60,
    //height:60,
    //borderRadius:30,
    marginTop:'-40%',
    alignItems:'center',
    justifyContent:'center',
    marginEnd:18
  },

  textFin:{
    textAlign:'center',
    color:'#fff',
    fontSize:20
  }

});



function play({route, navigation}){

  const {DIP1} = route.params
  const {DIP2} = route.params

  //const DIP1 = '192.168.0.19';
  //const DIP2 = '192.168.0.15';

  return (
    <Playclass ip1={DIP1} ip2={DIP2} navigation={navigation}/>
  )
}


export default play;