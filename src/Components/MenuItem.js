import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors } from '../Config/Config';

export default function MenuItem(props) {
  const bgColor = (props.active === true) ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.white };
  const txtColor = (props.active === true) ? { color: Colors.white } : { color: Colors.primary };
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, bgColor]}>
      <View >
        <Text style={[styles.buttonText, txtColor]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.lightgrey,
    borderWidth: 0.4,
    borderStyle: "solid",
  },
  buttonText: {
    fontSize: 24,
    color: Colors.black,
  },
})