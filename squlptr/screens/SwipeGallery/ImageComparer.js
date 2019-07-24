import React from 'react';
import styled from 'styled-components/native';
import Svg, { Defs, Rect, ClipPath } from 'react-native-svg';

export default ({ visible, beforeSrc, AfterSrc }) => (
  <ImageComparerContainer>
    <BeforeImage />

    <AfterImage>
      <Svg width="100%" height="100%" key={visible}>
        <Defs>
          <ClipPath id="visible">
            <Rect x={visible} y={0} width="100%" height="100%"></Rect>
          </ClipPath>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="green" clipPath="url(#visible)"></Rect>
      </Svg>
    </AfterImage>

  </ImageComparerContainer>
);

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
  width: 100%;
  height: 100%;
`;

const BeforeImage = styled.View`
  ${imageStyle}
  z-index: 99;
  background-color: blue;
`;

const AfterImage = styled.View`
  ${imageStyle}
  z-index: 999;
`;
