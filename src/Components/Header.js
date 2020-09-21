import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { Colors } from '../Config/Config';

export default function Header(props) {

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "90%",
    height: 100,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightgrey,
    borderBottomWidth: 1,
    paddingTop: 30
  },
  title: {
    fontSize: 30,
    paddingBottom: 5,
    color: Colors.primary,
    fontWeight: "bold",

  }

})