import React, { Component } from 'react';
import styled from 'styled-components/native';

export default ({ afterImageSrc, style }) => {
  return (
    <CardContainer style={style}>
      <AfterImage source={afterImageSrc} alt="No image to display" />
    </CardContainer>
  );
};

const CardContainer = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: black;
`;

const AfterImage = styled.Image`
  width: 100%;
  height: 100%;
`;
