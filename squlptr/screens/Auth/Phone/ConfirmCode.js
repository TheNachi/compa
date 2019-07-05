import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Octicons';
import styled, { css } from 'styled-components/native';
import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';

const HeaderText = styled.Text`
  color: #344148;
  font-weight: 800;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 9px;
`;

const BodyText = styled.Text`
  font-size: 14px;
  color: #8c8c8c;
  line-height: 20px;
  text-align: center;
  width: 76%;
  align-self: center;
`;
class ConfirmCode extends React.Component {
  state = { code: '', phone: '' };

  render() {
    let { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
        <HeaderText>Enter confirmation code</HeaderText>
        <BodyText>
          Enter one time 4-digit confirmation code sent to your phone number
        </BodyText>
        <TextInputWrap>
          <TextInputBox
            onChangeText={code => this.setState({ code })}
            value={this.state.code}
            maxLength={4}
            style={{
              flex: 1,
              marginRight: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code => this.setState({ code })}
            value={this.state.code}
            maxLength={4}
            style={{
              flex: 1,
              marginRight: 10,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code => this.setState({ code })}
            value={this.state.code}
            maxLength={4}
            style={{
              flex: 1,
              marginRight: 10,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code => this.setState({ code })}
            value={this.state.code}
            maxLength={1}
            style={{
              flex: 1,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
        </TextInputWrap>
        <Button
          title="Verify"
          color={Colors.squlptr}
          onPress={() => navigate('BuildProfileScreen')}
        />
      </View>
    );
  }
}

const TextInputWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 10px;
  width: 80%;
`;

const TextInputBox = styled.TextInput`
  height: 40px;
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 10px;
  padding-left: 15px;
`;

export default ConfirmCode;
