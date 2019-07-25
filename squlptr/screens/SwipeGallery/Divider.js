import React, { Component } from 'react';
import styled from 'styled-components/native';
import { PanResponder } from 'react-native';

export default class Divider extends Component {

  state = {
    x: 0,
    startX: 0,
  };

  componentWillMount() {
    const { initialX } = this.props;

    this.setState({ x: initialX });

    this.initialPanResponder();
  }

  initialPanResponder() {
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => {
        let { x } = this.state;
        this.setState({ startX: x });

        return true;
      },
      onPanResponderMove: (event, gestureState) => {
        let { x, startX } = this.state;
        
        x = startX + gestureState.dx;

        this.setState({ x });

        this.props.onDraggerMove(x);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (event, gestureState) => true,
    });
  }

  render() {
    const { x } = this.state;

    return (
      <DividerLineOuter style={{
        left: x,
      }}>
        <DraggerWrapper>
          <Dragger {...this.pan.panHandlers}>
            <DraggerLine />
          </Dragger>
        </DraggerWrapper>
      </DividerLineOuter>
    );
  }
}

const DividerLineOuter = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 9999999999;
`;

const DraggerWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Dragger = styled.View`
  position: absolute;
  height: 70px;
  width: 60px;
  top: 50%;
  left: -29px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DraggerLine = styled.View`
  width: 8px;
  height: 70px;
  background: #fff;
`;
