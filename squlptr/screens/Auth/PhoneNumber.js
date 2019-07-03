import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styled, { css } from 'styled-components/native';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

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
class PhoneNumber extends React.Component {
  state = { code: '', phone: '' };

  render() {
    let { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
        <HeaderText>What's your phone numeber?</HeaderText>
        <BodyText>
          Whether you are a new or returning member, let’s start with your phone
          number.
        </BodyText>
        <TextInputWrap>
          <TextInputBox
            onChangeText={text => this.setState({ code })}
            value={this.state.code}
            maxLength={4}
            style={{
              flex: 0.12,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
          <TextInputBox
            onChangeText={phone => this.setState({ phone })}
            clearButtonMode="always"
            value={this.state.phone}
            style={{ flex: 1 }}
            keyboardType="phone-pad"
          />
        </TextInputWrap>
        <Button
          title="Continue"
          color={Colors.squlptr}
          onPress={() => navigate('PhoneNumberScreen')}
        />
      </View>
    );
  }
}

const TextInputWrap = styled.View`
  flex-direction: row;
  align-items: center;
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

export default PhoneNumber;
