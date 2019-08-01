import React, { Component } from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default class Incrementer extends Component {

  state = {
    value: 0,
  };

  componentWillMount() {
    this.setState({
      value: this.props.initialValue,
    });
  }

  onDecrement() {
    const { minValue } = this.props;
    let { value } = this.state;

    if (minValue && value == minValue) {
      return;
    }

    value--;
    this.setState({ value });

    this.callValueChangedListener(value);
  }

  onIncrement() {
    const { maxValue } = this.props;
    let { value } = this.state;

    if (maxValue && value == maxValue) {
      return;
    }

    value++;
    this.setState({ value });

    this.callValueChangedListener(value);
  }

  callValueChangedListener(value) {
    this.props.onValueChanged(value);
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[
        styles.buttonContainer,
        style || {},
      ]}>
        <IncrementerButton
          onPress={() => this.onDecrement()}
        >
          <Text style={styles.buttonText}>-</Text>
        </IncrementerButton>

        <View style={styles.divider} />

        <IncrementerButton
          onPress={() => this.onIncrement()}
        >
          <Text style={styles.buttonText}>+</Text>
        </IncrementerButton>
      </View>
    );
  }
}

const IncrementerButton = styled.TouchableOpacity`
  width: 35px;
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderColor: Colors.squlptr,
    borderRadius: 6,
    width: 71,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 25,
    color: Colors.squlptr,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.squlptr,
  }
});
