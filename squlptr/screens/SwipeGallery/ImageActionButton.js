import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

export default class Button extends Component {
  state = {
    pressed: false,
  };

  onPressOut() {
    this.setState({ pressed: false, });
  }

  onPressIn() {
    this.setState({ pressed: true, });
  }

  render() {
    const { style, activeStyle, children } = this.props;
    const { pressed } = this.state;

    return (
      <TouchableOpacity
        style={pressed ? activeStyle : style}
        activeOpacity={1}
        onPressOut={() => this.onPressOut()}
        onPressIn={() => this.onPressIn()}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
