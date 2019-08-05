import React, { Component } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

export default class ImageComparer extends Component {

  render() {
    const { visible, beforeSrc, afterSrc } = this.props;
    
    return (
      <ImageComparerContainer>
        <BeforeImage>
          <Image source={beforeSrc} />
          <BeforeText>BEFORE</BeforeText>
        </BeforeImage>

        <AfterImage
          style={{
            left: visible,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: visible*-1,
              right: 0,
              bottom: 0,
            }}
          >
            <Image source={afterSrc} />
            <AfterText>AFTER</AfterText>
          </View>
        </AfterImage>

      </ImageComparerContainer>
    );
  }
}

const ImageComparerContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 13px;
  overflow: hidden;
`;

const imageStyle = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const BeforeImage = styled.View`
  ${imageStyle}
  z-index: 996;
`;

const AfterImage = styled.View`
  ${imageStyle}
  overflow: hidden;
  z-index: 999;
`;

const compareTextStyle = `
  color: #fff;
  position: absolute;
  bottom: 15px;
  z-index: 99999;
  font-size: 16px;
  font-weight: bold;
`;

const BeforeText = styled.Text`
  ${compareTextStyle}
  left: 20px;
`;

const AfterText = styled.Text`
  ${compareTextStyle}
  right: 20px;
`;
