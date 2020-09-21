import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import ConfigCard from '../Components/ConfigCard';
import { configuracion } from '../Config/Config';

export default class ConfigurationScreen extends React.Component {
  state = configuracion;

  constructor(props) {
    super(props);
    this.state = configuracion;
    this.getstorage();
  }

  getstorage = async () => {
    try {
      const data = await AsyncStorage.getItem("userConfig");
      if (data !== undefined && data !== null) {
        let userConfig = JSON.parse(data);
        try {
          if (userConfig.activityOne === undefined || userConfig.activityTwo === undefined || userConfig.steps === undefined) {
            throw Error('userConfig stored is undefined')
          } else {
            this.setState({ userConfig: userConfig })
          }
        } catch (err) {
          await AsyncStorage.setItem("userConfig", JSON.stringify(configuracion));
          this.setState({ userConfig: configuracion });
        }


      }
    } catch (err) {
      console.log(err);
    }
  }

  updateConfig = async (name, json) => {
    let newState = this.state;
    switch (name) {
      case "activityOne":
        let activityOne = json
        newState.userConfig.activityOne = activityOne
        break;
      case "activityTwo":
        let activityTwo = json
        newState.userConfig.activityTwo = activityTwo
        break;
      case "steps":
        let steps = json
        newState.userConfig.steps = steps
        break;

      default:
        break;
    }
    try {
      await AsyncStorage.setItem("userConfig", JSON.stringify(this.state.userConfig));
    } catch (err) {
      alert("Error guardando configuración")
    }
  }


  render() {
    if (this.state.userConfig === undefined) {
      return <View></View>
    } else {
      return (
        <View style={style.screen}>
          <ConfigCard defaultActivity="Camina" id="activityOne" UPDAcivity={true} config={this.state.userConfig.activityOne} updateConfig={this.updateConfig} />
          <ConfigCard defaultActivity="Trota" id="activityTwo" UPDAcivity={true} config={this.state.userConfig.activityTwo} updateConfig={this.updateConfig} />
          <ConfigCard defaultActivity="Repeticiones" id="steps" UPDAcivity={false} config={this.state.userConfig.steps} updateConfig={this.updateConfig} />
        </View>
      );
    }
  }
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    width: "90%",
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center"

  }
})