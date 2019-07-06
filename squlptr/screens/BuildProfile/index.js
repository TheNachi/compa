import React from 'react';
import { Alert, View, TouchableOpacity, ScrollView } from 'react-native';
import styled, { css } from 'styled-components/native';
import Icon from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

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

const AddPhoto = styled.TouchableOpacity`
  height: 97px;
  width: 97px;
  background-color: #f1f1f1;
  border-radius: 100px;
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddPhotoText = styled.Text`
  color: #f67e00;
  font-size: 14px;
  line-height: 20px;
  width: 40%;
  text-align: center;
`;

const CloseWrap = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-right: 25px;
  padding-bottom: 25px;
  padding-top: 10px;
`;

class BuildProfile extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = { firstName: '', lastName: '', email: '' };

  render() {
    let { navigate } = this.props.navigation;

    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 40 }}
      >
        <CloseWrap>
          <TouchableOpacity>
            <Icon name="close" size={40} style={{ color: Colors.squlptr }} />
          </TouchableOpacity>
        </CloseWrap>
        <HeaderText>Build Profile</HeaderText>
        <BodyText>
          Enter one time 4-digit confirmation code sent to your phone number
        </BodyText>
        <AddPhoto>
          <AddPhotoText>Add Photo</AddPhotoText>
        </AddPhoto>
        <TextInputBox
          onChangeText={firstName => this.setState({ firstName })}
          clearButtonMode="always"
          value={this.state.firstName}
          style={{ width: '80%' }}
          keyboardType="name-phone-pad"
          placeholder="First name"
        />
        <TextInputBox
          onChangeText={lastName => this.setState({ lastName })}
          clearButtonMode="always"
          value={this.state.lastName}
          style={{ width: '80%' }}
          keyboardType="name-phone-pad"
          placeholder="Last"
        />
        <TextInputBox
          onChangeText={email => this.setState({ email })}
          clearButtonMode="always"
          value={this.state.email}
          style={{ width: '80%', marginBottom: 5 }}
          keyboardType="email-address"
          placeholder="First name"
        />
        <Button
          title="Continue"
          color={Colors.squlptr}
          onPress={() => navigate('HomeScreen')}
        />
      </ScrollView>
    );
  }
}

const TextInputBox = styled.TextInput`
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 15px;
  margin-top: 15px;
`;

export default BuildProfile;
