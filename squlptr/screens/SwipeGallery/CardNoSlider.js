import React, { Component } from 'react';
import styled from 'styled-components/native';

export default ({ afterImageSrc, style }) => {
  return (
    <CardContainer style={style}>
      <AfterImage source={afterImageSrc} />
    </CardContainer>
  );
};

const CardContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: black;
`;

const AfterImage = styled.View`
  width: 100%;
  height: 100%;
`;
