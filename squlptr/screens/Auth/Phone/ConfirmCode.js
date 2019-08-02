import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, AsyncStorage } from 'react-native';
import Icon from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';
import { encode as btoa } from 'base-64';
import axios from 'axios';

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

const accountSid = 'ACb5aa1033cd1e3876061a6d8cc44b0a38';
const authToken = '0f4632b18a96d45ccf48260c4818a2cd';
let encoded = btoa(`${accountSid}:${authToken}`);
let TwilioInstance = axios.create({
  baseURL: 'https://verify.twilio.com/v2',
  headers: { Authorization: `Basic ${encoded}` }
});

const ACCESS_TOKEN = 'access_token';
class ConfirmCode extends React.Component {
  state = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
    phone: ''
  };

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
    } catch (error) {
      console.error('Token not stored', { error });
    }
  }

  handleVerifyCode = () => {
    // onPress={() => navigate('BuildProfileScreen')}
    this.setState({ loading: true });
    let { code1, code2, code3, code4, code5, code6, phone } = this.state;

    let code = `${code1}${code2}${code3}${code4}${code5}${code6}`;
    console.log('inside handleVerifyCode code is ', { code, phone });
    var form = new FormData();
    form.append('To', phone);
    form.append('Code', code);
    TwilioInstance.post(
      '/Services/VAcb3d37dc42ac4495d4886fba0cfb851d/VerificationCheck',
      form
    )
      .then(response => {
        console.log('response is ', response);
        let status = response.data.status;
        if (status == 'approved') {
          this.storeToken(status);
          this.setState({ loading: false });
          this.props.navigation.navigate('BuildProfileScreen');
        }
      })
      .catch(err => {
        console.log({ err });
        this.setState({ loading: false });
        alert('Verification unsuccessful');
      });
  };

  componentDidMount() {
    let phone = this.props.navigation.getParam('phone');
    this.setState({ phone });
  }

  render() {
    let { navigate } = this.props.navigation;
    let {
      code1,
      code2,
      code3,
      code4,
      code5,
      code6,
      phone,
      loading
    } = this.state;
    let isButtonEnabled =
      !!code1 && !!code2 && !!code3 && !!code4 && !!code5 && !!code6;
    // console.log(this.state);

    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
        <HeaderText>Enter confirmation code</HeaderText>
        <BodyText>
          Enter one time 4-digit confirmation code sent to your phone number
        </BodyText>
        <TextInputWrap>
          <TextInputBox
            onChangeText={code1 => this.setState({ code1 })}
            value={this.state.code}
            keyboardType="numeric"
            maxLength={1}
            style={{
              flex: 1,
              marginRight: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code2 => this.setState({ code2 })}
            value={this.state.code}
            keyboardType="numeric"
            maxLength={1}
            style={{
              flex: 1,
              marginRight: 10,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code3 => this.setState({ code3 })}
            value={this.state.code}
            keyboardType="numeric"
            maxLength={1}
            style={{
              flex: 1,
              marginRight: 10,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code4 => this.setState({ code4 })}
            value={this.state.code}
            keyboardType="numeric"
            maxLength={1}
            style={{
              flex: 1,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code5 => this.setState({ code5 })}
            value={this.state.code}
            keyboardType="numeric"
            maxLength={1}
            style={{
              flex: 1,
              marginLeft: 10,
              textAlign: 'center'
            }}
          />
          <Icon name="dash" style={{ color: '#C4C4C4' }} />
          <TextInputBox
            onChangeText={code6 => this.setState({ code6 })}
            value={this.state.code}
            keyboardType="numeric"
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
          // onPress={() => navigate('BuildProfileScreen')}
          isLoading={loading}
          disabled={!isButtonEnabled}
          onPress={this.handleVerifyCode}
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
  padding-left: 10px;
`;

export default ConfirmCode;
