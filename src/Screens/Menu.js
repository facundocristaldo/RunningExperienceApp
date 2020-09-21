import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MenuItem from '../Components/MenuItem';
import { Screens } from '../Config/Config';


export default function Menu(props) {
  const activeWindow = props.activeWindow;

  return (
    <View style={style.menuContainer}>
      <MenuItem active={(activeWindow === Screens.configuracion) ? true : false} title="Configuración" onPress={() => props.onChangeWindow(Screens.configuracion)} />
      <MenuItem active={(activeWindow === Screens.timer) ? true : false} title="A Correr" onPress={() => props.onChangeWindow(Screens.timer)} />
    </View>
  )

}


const style = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "grey",
    justifyContent: "space-around",
    alignItems: "center"
  },
  menuItem: {}
})