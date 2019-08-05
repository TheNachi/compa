import React, { Component } from 'react';
import styled from 'styled-components/native';
import { PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
        if (x < 0) {
          x = 0;
        }

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
        <DraggerWrapper />
        <Dragger>
          <Svg width="13" height="24" viewBox="0 0 13 24">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.97604 0.478884L0.404434 10.9215C-0.134811 11.5089 -0.134811 12.4896 0.404434 13.0794L9.97604 23.5196C10.5631 24.1601 11.4897 24.1601 12.0768 23.5196C12.6977 22.8417 12.6977 21.7126 12.0768 21.0335L4.06026 12.2881C3.91484 12.1301 3.91484 11.8684 4.06026 11.7103L12.0768 2.96498C12.6977 2.28706 12.6977 1.15801 12.0768 0.478884C11.7827 0.160432 11.4048 0 11.0269 0C10.648 0 10.2701 0.160432 9.97604 0.478884Z" fill="#ffffff"/>
          </Svg>
          <DraggerLine />
          <Svg width="13" height="24" viewBox="0 0 13 24">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M2.56644 0.478884L12.138 10.9215C12.6773 11.5089 12.6773 12.4896 12.138 13.0794L2.56644 23.5196C1.97943 24.1601 1.05273 24.1601 0.465718 23.5196C-0.155263 22.8417 -0.155263 21.7126 0.465718 21.0335L8.48222 12.2881C8.62764 12.1301 8.62764 11.8684 8.48222 11.7103L0.465718 2.96498C-0.155263 2.28706 -0.155263 1.15801 0.465718 0.478884C0.759756 0.160432 1.13765 0 1.51555 0C1.89451 0 2.2724 0.160432 2.56644 0.478884Z" fill="#ffffff"/>
          </Svg>
        </Dragger>
        <TouchArea {...this.pan.panHandlers} />
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
  width: 42px;
  top: 50%;
  left: -20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TouchArea = styled.View`
  position: absolute;
  top: 47.5%;
  left: -48px;
  width: 94px;
  height: 94px;
  border-radius: 200px;
`;

const DraggerLine = styled.View`
  width: 8px;
  height: 70px;
  background: #fff;
`;
