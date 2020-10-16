//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
// create a component
class CaptureTouch extends Component {
   constructor(props) {
      super(props);
      const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gesture) => {
            console.log(gesture);
         }
      });
      this.state = { panResponder };
   }
   render() {
      return (
         <View 
            style={styles.ball}
            {...this.state.panResponder.panHandlers}
         />
      );
   }
}

const styles = StyleSheet.create({

    ball:{
        flex:1,
        backgroundColor:'#000'
    }

})

export default CaptureTouch;