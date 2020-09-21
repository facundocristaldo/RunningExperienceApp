import React from "react";
import { StyleSheet, View, Text } from "react-native";



export default class ACorrerScreen extends React.Component {
  render() {
    return (
      <View style={style.screen}>
        <Text>ACorrer</Text>
      </View>
    );
  }
}


const style = StyleSheet.create({
  screen: {
    flex: 1
  }
})