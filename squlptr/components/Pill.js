import React from 'react';
import styled from 'styled-components';

const Pill = ({ title, background }) => (
  <PillStyle background={background}>
    <PillText>{title}</PillText>
  </PillStyle>
);

const PillStyle = styled.View`
  border-radius: 25px;
  padding: 8px 10px;
  background: ${props => (props.background ? props.background : '#FFEFE0')};
`;

const PillText = styled.Text`
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: #344148;
`;

export default Pill;
