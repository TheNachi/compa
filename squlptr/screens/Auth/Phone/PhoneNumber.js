import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Alert, View } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';
import axios from 'axios';
import { encode as btoa } from 'base-64';

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
class PhoneNumber extends React.Component {
  state = { code: '+1', phone: '', codeError: '', loading: false };

  handleValidatePhone = phone => {
    this.setState({ loading: true });
    console.log('inside validate phone phone is ', phone);
    var form = new FormData();
    form.append('To', phone);
    form.append('Channel', 'sms');
    TwilioInstance.post(
      '/Services/VAcb3d37dc42ac4495d4886fba0cfb851d/Verifications',
      form
    )
      .then(response => {
        console.log('response is ', response);
        this.setState({ loading: false });
        this.props.navigation.navigate('ConfirmCodeScreen', {
          phone: phone
        });
      })
      .catch(err => {
        console.log({ err: err.response.data.message });
        this.setState({ loading: false });
      });

    // this.props.navigation.navigate('ConfirmCodeScreen', {
    //   phone: phone
    // });
  };

  validateMobileNumber() {
    const { code } = this.state;
    
    let error;
    if (!/^\+[0-9]+$/.test(code.toString())) {
      error = 'Invalid country code';
    } 

    if (error) {
      this.setState({ codeError: error });
      return false;
    }

    this.setState({ codeError: '' });
    return true;
  }

  handlePhoneNumber = () => {
    let { code, phone } = this.state;

    if (!this.validateMobileNumber()) {
      return;
    }

    Alert.alert(
      'Confirmation',
      `We will send a verification code to the following number ${code}${phone}`,
      [
        {
          text: "Don't Allow",
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Allow',
          // onPress: () => this.props.navigation.navigate('ConfirmCodeScreen')
          onPress: () => this.handleValidatePhone(`${code}${phone}`)
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    let { navigate } = this.props.navigation;
    let { loading, code, phone, codeError } = this.state;
    let isButtonEnabled = !!code && !!phone && !codeError;
    console.log({ isButtonEnabled });

    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
        <HeaderText>What's your phone number?</HeaderText>
        <BodyText>
          Whether you are a new or returning member, let’s start with your phone number.
        </BodyText>
        <TextInputWrap>
          <TextInputBox
            onChangeText={code => this.setState({ code }, () => this.validateMobileNumber())}
            keyboardType="phone-pad"
            value={this.state.code}
            maxLength={4}
            style={{
              flex: 0.18,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
          <TextInputBox
            onChangeText={phone => this.setState({ phone: phone.trim() })}
            clearButtonMode="always"
            value={this.state.phone}
            style={{ flex: 1 }}
            keyboardType="phone-pad"
          />
        </TextInputWrap>
        
        <ErrorText>{codeError}</ErrorText>

        <Button
          disabled={!isButtonEnabled}
          title="Continue"
          color={Colors.squlptr}
          onPress={this.handlePhoneNumber}
          isLoading={loading}
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

const ErrorText = styled.Text`
  font-size: 13px;
  color: #cc0000;
`;

export default PhoneNumber;
