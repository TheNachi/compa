import React, { Component } from 'react';
import styled from 'styled-components/native';
import Svg, { Defs, Rect, ClipPath, Image as SvgImage } from 'react-native-svg';

export default class ImageComparer extends Component {

  render() {
    const { visible, beforeSrc, afterSrc } = this.props;
    return (
      <ImageComparerContainer>
        <BeforeImage>
          <Svg width="100%" height="100%" key={-1}>
            <SvgImage href={beforeSrc} x="0" y="0" width="100%" height="100%"></SvgImage>
          </Svg>
        </BeforeImage>

        <AfterImage>
          <Svg width="100%" height="100%" key={visible}>
            <Defs>
              <ClipPath id="visible">
                <Rect x={visible} y={0} width="100%" height="100%"></Rect>
              </ClipPath>
            </Defs>
            <SvgImage href={afterSrc} x="0" y="0" width="100%" height="100%" clipPath="url(#visible)"></SvgImage>
          </Svg>
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
  background: black;
`;

const imageStyle = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BeforeImage = styled.View`
  ${imageStyle}
  z-index: 996;
`;

const AfterImage = styled.View`
  ${imageStyle}
  z-index: 999;
`;
