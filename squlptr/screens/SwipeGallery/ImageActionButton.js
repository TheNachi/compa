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
    const { style, activeStyle, onClick, children } = this.props;
    const { pressed } = this.state;

    const optionalProps = {};
    if (onClick) {
      optionalProps.onPress = onClick;
    }

    return (
      <TouchableOpacity
        style={pressed ? activeStyle : style}
        activeOpacity={1}
        onPressOut={() => this.onPressOut()}
        onPressIn={() => this.onPressIn()}
        {...optionalProps}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
