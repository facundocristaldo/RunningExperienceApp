import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

import Menu from './src/Screens/Menu';
import { Screens, Colors } from './src/Config/Config';
import MenuItem from './src/Components/MenuItem';
import ACorrerScreen from './src/Screens/ACorrerScreen';
import ConfigurationScreen from './src/Screens/ConfigurationScreen';
import Header from './src/Components/Header';

export default function App() {
  const [displayWindow, setDisplayWindow] = useState(Screens.timer)
  const screenWidth = Math.round(Dimensions.get('window').width);

  const handleChangeWindow = (windowName) => {
    setDisplayWindow(windowName);
  }

  return (
    <View style={styles.container}>
      <Header title="Running Experience" />
      <ScrollView contentContainerStyle={[styles.content, { width: screenWidth }]}>
        {(displayWindow === Screens.configuracion) ? <ConfigurationScreen /> : <ACorrerScreen />}
      </ScrollView>
      <Menu activeWindow={displayWindow} onChangeWindow={(window) => { handleChangeWindow(window) }}></Menu>
    </View>
  );
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
