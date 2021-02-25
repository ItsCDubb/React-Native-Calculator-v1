import React, { Component } from "react";
import { Dimensions, PanResponder, StyleSheet, Text, View } from "react-native";
import { CalcButton, CalcDisplay } from "../components";

require("../lib/swisscalc.lib.format.js");
require("../lib/swisscalc.lib.operator.js");
require("../lib/swisscalc.lib.operatorCache.js");
require("../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.calc.calculator.js");

export default class CalculatorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      orientation: "portrait",
    };

    // Initialize calculator
    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    // Listen for change in orientation
    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window");
      let orientation = width > height ? "landscape" : "portrait";
      this.setState({ orientation: orientation });
    });

    // Initialize PanResoponders (iOS specific)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspace();
        }
      },
    });
  }

  //   When a digit is pressed
  onDigitPress = (digit) => {
    this.calc.addDigit(digit);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  //   When Clear is pressed
  onClear = () => {
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  //   When a binary operator is pressed
  onBinaryOperator = (operator) => {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  //   When Equal is pressed
  onEqual = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  // When Backspace is pressed
  onBackspace = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  renderPortrait() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          {...this.panResponder.panHandlers}
        >
          <CalcDisplay display={this.state.display} />
        </View>
        <View
          style={{
            borderBottomColor: "#d4d4d2",
            borderBottomWidth: 0.25,
            marginBottom: 10,
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onClear();
              }}
              title="C"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton title="" color="" backgroundColor="" />
            <CalcButton title="" color="" backgroundColor="" />
            <CalcButton
              onPress={() => {
                this.onBinaryOperator(this.oc.DivisionOperator);
              }}
              title="÷"
              color="#d4d4d2"
              backgroundColor="#f09a36"
            />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("7");
              }}
              title="7"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("8");
              }}
              title="8"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("9");
              }}
              title="9"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperator(this.oc.MultiplicationOperator);
              }}
              title="×"
              color="#d4d4d2"
              backgroundColor="#f09a36"
            />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("4");
              }}
              title="4"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("5");
              }}
              title="5"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("6");
              }}
              title="6"
              color="#d4d4d2"
              backgroundColor="#505050"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperator(this.oc.SubtractionOperator);
              }}
              title="-"
              color="#d4d4d2"
              backgroundColor="#f09a36"
            />
          </View>
          <View>
            <View style={styles.buttonRow}>
              <CalcButton
                onPress={() => {
                  this.onDigitPress("1");
                }}
                title="1"
                color="#d4d4d2"
                backgroundColor="#505050"
              />
              <CalcButton
                onPress={() => {
                  this.onDigitPress("2");
                }}
                title="2"
                color="#d4d4d2"
                backgroundColor="#505050"
              />
              <CalcButton
                onPress={() => {
                  this.onDigitPress("3");
                }}
                title="3"
                color="#d4d4d2"
                backgroundColor="#505050"
              />
              <CalcButton
                onPress={() => {
                  this.onBinaryOperator(this.oc.AdditionOperator);
                }}
                title="+"
                color="#d4d4d2"
                backgroundColor="#f09a36"
              />
            </View>
            <View style={styles.buttonRow}>
              <CalcButton
                onPress={() => {
                  this.onDigitPress("0");
                }}
                title="0"
                color="#d4d4d2"
                backgroundColor="#505050"
                style={{
                  flex: 2,
                }}
              />
              <CalcButton
                onPress={() => {
                  this.onDigitPress(".");
                }}
                title="."
                color="#d4d4d2"
                backgroundColor="#505050"
              />
              <CalcButton
                onPress={() => {
                  this.onEqual();
                }}
                title="="
                color="#d4d4d2"
                backgroundColor="#f09a36"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderLandscape() {
    return (
      <View>
        <Text>Landscape</Text>
      </View>
    );
  }

  render() {
    let view =
      this.state.orientation == "portrait"
        ? this.renderPortrait()
        : this.renderLandscape();

    return <View style={{ flex: 1 }}>{view}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#333",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
