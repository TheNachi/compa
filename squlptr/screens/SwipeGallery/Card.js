import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, PanResponder, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import ImageComparer from './ImageComparer';
import Divider from './Divider';

export default class Card extends Component {
  state = {
    visible: 90,
    isSwiping: false,
    actionToPerform: null,
  };

  componentWillMount() {
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => this.touchListener(gestureState.dx),
      onPanResponderRelease: (event, gestureState) => this.releaseListener(),
    });
  }

  onDraggerMove(newX) {
    this.setState({ visible: newX });
  }

  releaseListener() {
    const { actionToPerform } = this.state;

    this.props.releaseListener(actionToPerform);

    this.setState({ isSwiping: false, actionToPerform: null });
  }

  touchListener(dx) {
    this.props.touchListener(dx);

    let actionToPerform = null;
    if (dx < 0) {
      actionToPerform = 'dislike';
    } else if (dx > 0) {
      actionToPerform = 'like';
    }

    let { isSwiping } = this.state;
    if (!isSwiping) {
      isSwiping = true;
    }

    this.setState({ isSwiping, actionToPerform });
  }

  render() {
    const { visible, isSwiping, actionToPerform } = this.state;

    const { style, beforeImageSrc, afterImageSrc } = this.props;

    return (
      <CardContainer style={style}> 
        {isSwiping && (
          <Image source={afterImageSrc} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
        )}

        {isSwiping && actionToPerform && (
          <SwipeActionIconContainer>
            {actionToPerform === 'like' ? (
              <View style={styles.likeActionIcon}>
                <Feather name="check" size={35} color="#27AE60" />
              </View>
            ) : (
              <View style={styles.dislikeActionIcon}>
                <Feather name="x" size={35} color="#c00" />
              </View>
            )}
          </SwipeActionIconContainer>
        )}
        
        {!isSwiping && (
          <ImageComparer
            visible={visible}
            beforeSrc={beforeImageSrc}
            afterSrc={afterImageSrc}
          />
        )}

        <SwipeEventView {...this.pan.panHandlers} />

        {!isSwiping && (
          <Divider
            initialX={visible}
            onDraggerMove={(x) => this.onDraggerMove(x)}
          />
        )}
        {!isSwiping && (
          <AfterText>AFTER</AfterText>
        )}
      </CardContainer>
    );
  }
}

const CardContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const AfterText = styled.Text`
  color: #fff;
  position: absolute;
  bottom: 15px;
  right: 20px;
  z-index: 99999;
  font-size: 16px;
  font-weight: bold;
`;

const SwipeEventView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 998;
  height: 100%;
`;

const SwipeActionIconContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const pictureActionIconStyle = {
  fontWeight: 'bold',
  width: 60,
  height: 60,
  borderRadius: 50,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  dislikeActionIcon: {
    ...pictureActionIconStyle,
    backgroundColor: '#FFCECE',
  },
  likeActionIcon: {
    ...pictureActionIconStyle,
    backgroundColor: '#BEF1C3',
  },
});
