import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class CalculatorDisplay extends Component {
  static defaultProps = {
    display: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.props.display}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  display: {
    fontSize: 75,
    color: "#d4d4d2",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "right",
  },
});
