import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class CalculatorButton extends Component {
  static defaultProps = {
    onPress: function () {},
    title: "",
    backgroundColor: "#000",
    radius: 40,
    style: {},
  };
  render() {
    let r = this.props.radius;
    let w = this.props.radius * 2;
    let h = this.props.radius * 2;
    let bc = this.props.backgroundColor;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.container,
          { width: w, height: h, borderRadius: r, backgroundColor: bc },
          { ...this.props.style },
        ]}
      >
        <Text style={[styles.text, { color: this.props.color }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", margin: 5 },
  text: { fontSize: 30, fontWeight: "bold" },
});
