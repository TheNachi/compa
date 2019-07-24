import React, { Component } from 'react';
import styled from 'styled-components/native';
import ImageComparer from './ImageComparer';
import Divider from './Divider';

export default class Card extends Component {
  state = {
    visible: 50,
  };

  onDraggerMove(newX) {
    const { visible } = this.state;

    this.setState({ visible: newX });
  }

  render() {
    const { visible } = this.state;

    return (
      <CardContainer>
        <ImageComparer visible={visible} />
        <Divider
          initialX={50}
          onDraggerMove={(x) => this.onDraggerMove(x)}
        />
        <AfterText>AFTER</AfterText>
      </CardContainer>
    );
  }
}

const CardContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: black;
`;

const AfterText = styled.Text`
  color: #fff;
  position: absolute;
  bottom: 15px;
  right: 20px;
  z-index: 99999;
  font-size: 16px;
`;
