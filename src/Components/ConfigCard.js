import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


import { Colors } from '../Config/Config';

export default class ConfigCard extends React.Component {
  state = {}

  isUPDAcivity = (this.props.UPDAcivity === undefined) ? true : this.props.UPDAcivity;
  borderBottomWidth = (this.isUPDAcivity) ? 0.5 : 0;

  constructor(props) {
    super(props);
    if (this.isUPDAcivity === true) {
      this.state = {
        activity: this.props.defaultActivity,
        title: this.props.defaultActivity,
        minutes: this.props.config.minutes,
        seconds: this.props.config.seconds,
      }
    } else {
      this.state = {
        activity: this.props.defaultActivity,
        title: this.props.defaultActivity,
        cantidad: this.props.config.steps
      }
    }
  }


  setActivity(val) {
    this.setState({ activity: val })
  }
  setMinutes(val) {
    this.setState({ minutes: val })
  }
  setSeconds(val) {
    this.setState({ seconds: val })
  }
  setCantidad(val) {
    this.setState({ cantidad: val })
  }




  updateActivity = (activityName) => {
    this.setActivity(activityName);
    this.props.updateConfig(this.props.id, { minutes: this.state.minutes, seconds: this.state.seconds, title: activityName })
  }
  updateState = (nombre, valor) => {
    if (nombre === undefined || nombre === "") {
      return;
    }
    if (valor.startsWith('0')) {
      valor = valor.slice(1, valor.length);
    }
    if (valor === undefined || valor === '') {
      valor = '0';
    }
    valor = valor.replace(/[^0-9]/g, '')
    if (isNaN(valor) || Number(valor) < 0 || Number(valor) > 99) {
      return;
    }

    switch (nombre) {
      case "minutes":
        this.setMinutes(valor);
        break;
      case "seconds":
        this.setSeconds(valor);
        break;
      case "cantidad":
        this.setCantidad(valor);
        break;
      default:
        break;
    }
    switch (nombre) {
      case "minutes":
        this.props.updateConfig(this.props.id, { minutes: Number(valor), seconds: Number(this.state.seconds), title: this.state.activity })
        break;
      case "seconds":
        this.props.updateConfig(this.props.id, { minutes: Number(this.state.minutes), seconds: Number(valor), title: this.state.activity })
        break;
      case "cantidad":
        this.props.updateConfig(this.props.id, { steps: Number(valor) })
        break;
      default:
        break;
    }

  }



  render() {
    let minutes = (this.state.minutes !== undefined) ? this.state.minutes.toString() : "0";
    let seconds = (this.state.seconds !== undefined) ? this.state.seconds.toString() : "0";
    let cantidad = (this.state.cantidad !== undefined) ? this.state.cantidad.toString() : "0";
    let campos = (
      <View style={styles.cantidadContainer}>
        <View style={styles.cantidadItemContainer}>
          <Text style={styles.cantidadTitle}>Minutos</Text>
          <TextInput keyboardType="number-pad" style={styles.cantidadInput} id='Minutos' value={minutes} onChange={(val) => { this.updateState('minutes', val.nativeEvent.text) }}></TextInput>
        </View>
        <View style={styles.cantidadItemContainer}>
          <Text style={styles.cantidadTitle}>Segundos</Text>
          <TextInput keyboardType="number-pad" style={styles.cantidadInput} id='Segundos' value={seconds} onChange={(val) => { this.updateState('seconds', val.nativeEvent.text) }}></TextInput>
        </View>
      </View>
    )
    let campoUnico = (
      <View style={styles.cantidadContainer}>
        <View style={[styles.cantidadItemContainer, { maxWidth: "50%" }]}>
          <Text style={styles.cantidadTitle}>Cantidad</Text>
          <TextInput keyboardType="number-pad" style={styles.cantidadInput} id='Cantidad' value={cantidad} onChange={(val) => { this.updateState('cantidad', val.nativeEvent.text) }}></TextInput>
        </View>
      </View>
    )

    return (
      <View style={styles.card}>
        <View style={[styles.title, { borderBottomWidth: this.borderBottomWidth }]}>
          {
            (this.isUPDAcivity === true) ?
              <TextInput style={styles.titleText} value={this.state.activity} onChange={(val) => { this.updateActivity(val.nativeEvent.text) }}></TextInput>
              :
              <Text style={styles.titleText}>{this.state.activity}</Text>
          }
        </View>
        {
          (this.isUPDAcivity === true) ?
            campos
            :
            campoUnico
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    margin: 10,
  },
  title: {
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
  },
  cantidadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cantidadItemContainer: {
    width: "80%",
    marginVertical: 10,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  cantidadTitle: {
    fontSize: 14,
  },
  cantidadInput: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
    padding: 0,
    width: 30,
    textAlign: "center",
  }
})