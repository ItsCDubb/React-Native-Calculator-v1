import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { FontAwesomeme5 } from "@expo/vector-icons";

export default class Menu extends Component {
  render() {
    return (
      <View>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ alignItems: "flex-end", margin: 16 }}
            onPress={this.props.navigation.openDrawer}
          >
            <FontAwesomeme5 name="bars" size={24} color="#fff" />
          </TouchableOpacity>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.text}>{this.props.name} Screen</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#333",
    fontSize: 20,
    fontWeight: "500",
  },
});
