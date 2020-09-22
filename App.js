import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';

import Menu from './src/Screens/Menu';
import { Screens, Colors, TimerConfig, configuracion, TimerStates } from './src/Config/Config';
import MenuItem from './src/Components/MenuItem';
import ACorrerScreen from './src/Screens/ACorrerScreen';
import ConfigurationScreen from './src/Screens/ConfigurationScreen';
import Header from './src/Components/Header';

export default class App extends React.Component {
  state = {
    timer: TimerConfig,
    displayWindow: Screens.timer,
    userConfig: configuracion
  };
  constructor(props) {
    super(props);
    this.state = {
      timer: TimerConfig,
      displayWindow: Screens.timer,
      userConfig: configuracion
    };
    this.getstorage();
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  timerinterval = undefined;
  screenWidth = Math.round(Dimensions.get('window').width);

  handleChangeWindow = (windowName) => {
    this.getstorage();
    this.setState({ displayWindow: windowName });
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
            let timer = {
              timerStatus: TimerStates.stopped,
              timerVal: "0",
              stepsLeft: "0",
              currentActivity: "Preparado?",
            }
            this.setState({ timer: timer, userConfig: userConfig })
          }
        } catch (err) {
          console.log("error=", error)
          await AsyncStorage.setItem("userConfig", JSON.stringify(configuracion));
          this.setState({
            timer: {
              timerStatus: TimerStates.stopped,
              timerVal: "0",
              stepsLeft: "0",
              currentActivity: "Preparado?",
            }
          });
        }
      } else {
        await AsyncStorage.setItem("userConfig", JSON.stringify(configuracion));
        this.setState({
          timer: {
            timerStatus: TimerStates.stopped,
            timerVal: "0",
            stepsLeft: "0",
            currentActivity: "Preparado?",
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }


  startTimer() {
    let actualtimer = this.state.timer;
    actualtimer.currentActivity = this.state.userConfig.activityOne.title;
    actualtimer.stepsLeft = this.state.userConfig.steps.steps;
    actualtimer.timerStatus = TimerStates.started;
    actualtimer.timerVal = (this.state.userConfig.activityOne.minutes * 60) + this.state.userConfig.activityOne.seconds;
    this.setState({ timer: actualtimer });
    this.timerinterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    let actualtimer = this.state.timer;
    actualtimer.timerVal -= 1;
    if (actualtimer.timerVal <= 0) {
      this.toggleActivity();
    } else {
      this.setState({ timer: actualtimer })
    }
  }

  toggleActivity() {
    console.log('toggle activity')
    let actualtimer = this.state.timer;
    if (actualtimer.currentActivity === this.state.userConfig.activityOne.title) {
      actualtimer.currentActivity = this.state.userConfig.activityTwo.title;
      actualtimer.timerVal = this.state.userConfig.activityTwo.seconds + (this.state.userConfig.activityTwo.minutes * 60)

    } else if (actualtimer.currentActivity === this.state.userConfig.activityTwo.title) {
      actualtimer.currentActivity = this.state.userConfig.activityOne.title;
      actualtimer.timerVal = this.state.userConfig.activityOne.seconds + (this.state.userConfig.activityOne.minutes * 60)
      actualtimer.stepsLeft -= 1
      if (actualtimer.stepsLeft <= 0) {
        actualtimer.currentActivity = "Felicitaciones!";
        actualtimer.timerVal = 0
        this.stopTimer();
      }
    }
    this.setState({ timer: actualtimer })
  }

  stopTimer() {
    let actualtimer = this.state.timer;
    actualtimer.timerStatus = TimerStates.stopped;
    this.setState({ timer: actualtimer });
    clearInterval(this.timerinterval)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Running Experience" />
        <ScrollView contentContainerStyle={[styles.content, { width: this.screenWidth }]}>
          {(this.state.displayWindow === Screens.configuracion) ?
            <ConfigurationScreen />
            :
            <ACorrerScreen
              timerStatus={this.state.timer.timerStatus}
              timerVal={this.state.timer.timerVal}
              stepsLeft={this.state.timer.stepsLeft}
              currentActivity={this.state.timer.currentActivity}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
            />
          }
        </ScrollView>
        <Menu activeWindow={this.state.displayWindow} onChangeWindow={(window) => { this.handleChangeWindow(window) }}></Menu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 60
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60
  }
});
