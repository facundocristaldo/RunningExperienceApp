import React from "react";
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { TimerStates } from "../Config/Config";



export default class ACorrerScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let tiempoEnSegundos = this.props.timerVal;
    let segundos = tiempoEnSegundos % 60;
    let minutos = tiempoEnSegundos / 60;

    let minutosSTR = String('0' + Math.floor(minutos)).slice(-2);
    let segundosSTR = String('0' + Math.floor(segundos)).slice(-2);

    let tiempoTexto = minutosSTR + ":" + segundosSTR;
    let accion = (this.props.timerStatus === TimerStates.stopped) ? <Button title="Comenzar" onPress={this.props.startTimer} /> : <TouchableWithoutFeedback onPress={this.props.stopTimer} ><View><Text>Finalizar</Text></View></TouchableWithoutFeedback>
    return (
      <View style={style.screen}>
        <View>
          <Text>{this.props.currentActivity}</Text>
        </View>
        <View>
          <Text>{tiempoTexto}</Text>
          {accion}
        </View>
        <View>
          <Text>Vueltas restantes:{this.props.stepsLeft}</Text>
        </View>
      </View >
    );
  }
}


const style = StyleSheet.create({
  screen: {
    flex: 1
  }
})