import React from 'react';
import styled, { css } from 'styled-components';
import { View, Animated, TouchableOpacity } from 'react-native';
import { GestureHandler } from 'expo';
import AppointmentCard from './AppointmentCard';
const { Swipeable } = GestureHandler;

class DocCard extends React.Component {
  state = {
    bounceValue: new Animated.Value(55),
    showAppointment: true,
    istoggled: false
  };

  toggleCardView = () => {
    let initialValue = this.state.istoggled
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.istoggled
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      istoggled: !this.state.istoggled
    });

    this.state.bounceValue.setValue(initialValue);
    Animated.spring(this.state.bounceValue, {
      toValue: finalValue,
      velocity: 3,
      bounciness: 2
    }).start();
  };

  _setMaxHeight = event => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  };

  _setMinHeight = event => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  };

  RightActions = (progress, dragX) => {
    let { hasVideo } = this.props;
    let { istoggled } = this.state;
    if (hasVideo) return null;
    if (istoggled) return null;
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#FEECEC',
            height: 55,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 20
          }}
        >
          <Animated.Text
            style={[{ color: '#EB5757' }, { transform: [{ scale }] }]}
          >
            Cancel
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let {
      thumbnail,
      name,
      clinic,
      status,
      hasVideo,
      hasAppointment,
      style
    } = this.props;
    let { bounceValue, istoggled } = this.state;
    return (
      <Swipeable renderRightActions={this.RightActions}>
        <Animated.View
          style={[
            {
              marginBottom: 5,
              paddingHorizontal: 25,
              overflow: 'hidden',
              backgroundColor: istoggled ? '#F4F4F4' : '#fff'
            },
            { height: hasVideo ? 'auto' : bounceValue },
            style
          ]}
          onPress={this.toggleCardView}
        >
          <DocCardHeader
            style={{
              borderBottomWidth: hasVideo ? 0 : 1,
              borderBottomColor: '#f2f2f2'
            }}
            disabled={!hasAppointment}
            onLayout={this._setMinHeight}
            onPress={this.toggleCardView}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}
            >
              <RoundedImage src={thumbnail} />
              <DocCardTextWrap>
                <DocCardTextPrimary>{name}</DocCardTextPrimary>
                <DocCardTextSecondary>{clinic}</DocCardTextSecondary>
              </DocCardTextWrap>
            </View>
            {status && <DocCardStatus status={status}>{status}</DocCardStatus>}
          </DocCardHeader>
          {hasAppointment && (
            <View style={{ height: 180 }} onLayout={this._setMaxHeight}>
              <AppointmentCard />
            </View>
          )}
          {this.props.children}
        </Animated.View>
      </Swipeable>
    );
  }
}

const DocCardHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 15px; */
  justify-content: space-between;
  /* background: pink; */
`;

const DocCardTextPrimary = styled.Text`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 3px;
`;

const DocCardTextSecondary = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #8c8c8c;
  margin-bottom: 5px;
`;

const DocCardStatus = styled.Text`
  overflow: hidden;
  border-radius: 12px;
  background: #ffefe0;
  font-size: 12px;
  line-height: 14px;
  color: #f67e00;
  padding: 5px 10px;

  ${props =>
    props.status == 'Pending' &&
    css`
      background: #ffefe0;
      color: #f67e00;
    `}

  ${props =>
    props.status == 'Approved' &&
    css`
      background: #a7feb6;
      color: #219653;
    `}
`;

const DocCardTextWrap = styled.View`
  margin-left: 15px;
`;

export default DocCard;
