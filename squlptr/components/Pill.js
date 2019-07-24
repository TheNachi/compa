import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const Pill = ({ title, background, isDeletable, onDelete }) => (
  <PillStyle background={background}>
    <PillText>{title}</PillText>
    {isDeletable && (
      <DeleteIcon onPress={onDelete} activeOpactiy={0.6}>
        <Ionicons color="#FFF" name="ios-close" size={15} />
      </DeleteIcon>
    )}
  </PillStyle>
);

const PillStyle = styled.View`
  border-radius: 25px;
  padding: 8px 10px;
  margin-right: 5px;
  background: ${props => (props.background ? props.background : '#FFEFE0')};
  position: relative;
`;

const PillText = styled.Text`
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: #344148;
`;

const DeleteIcon = styled.TouchableOpacity`
  height: 22px;
  width: 22px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background: #8c8c8c;
  position: absolute;
  right: -5px;
  top: -10px;
  z-index: 100;
`;

export default Pill;
