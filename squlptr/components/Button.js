import React from 'react';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ButtonStyle = styled.TouchableOpacity`
  height: 52px;
  width: 80%;
  margin-top: 18px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  text-align: center;
  background-color: ${props => (props.color ? props.color : 'red')};
`;

const ButtonWrap = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const Button = ({ title, color, icon, wrapStyle, style, onPress }) => {
  return (
    <ButtonStyle style={style} onPress={onPress} color={color}>
      <ButtonWrap style={wrapStyle}>
        {icon && (
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name={icon}
            size={16}
            color={Colors.white}
          />
        )}
        <ButtonText>{title}</ButtonText>
      </ButtonWrap>
    </ButtonStyle>
  );
};

export default Button;
