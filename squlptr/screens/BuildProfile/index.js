import React from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler,
  Image
} from 'react-native';
import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import DateTimePicker from "react-native-modal-datetime-picker";

const RoundedImage = ({ src }) => (
  <View
    style={{
      height: 97,
      width: 97,
      borderRadius: 100,
      overflow: 'hidden'
    }}
  >
    <Image
      style={{
        height: '100%',
        width: '100%'
      }}
      resizeMode="cover"
      source={{ uri: src }}
    />
  </View>
);

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
  margin-top: 40px;
`;

let SqulptrInstance = axios.create({
  baseURL: 'https://squlptr-api-staging.herokuapp.com/api',
  headers: {
    Authorization: `Bearer $squlptr_jwt_secret$`
  }
});

const USER_TOKEN = 'USER_TOKEN';
class BuildProfile extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    avatar: null,
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    phone: '',
    username: '',
    dob: '',
    avatarError: '',
    firstnameError: '',
    lastError: '',
    usernameError: '',
    emailError: '',
    birthDatePickerVisible: false,
    loading: false
  };

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return false;
    }

    return true;
  };

  _pickImage = async () => {
    if (!this.getPermissionAsync()) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    debugger;
    console.log('image result is ', result);

    if (!result.cancelled) {
      this.setState({ avatar: result.uri, avatarError: '' });
    } else if (!this.state.avatar) { // If select was cancelled and no avatar was selected.
      this.setState({ avatarError: 'Your profile picture is required', });
    }
  };

  async storeToken(token) {
    console.log('inside store token token is ', token);
    try {
      await AsyncStorage.setItem(USER_TOKEN, token);
      console.log('token stored');
    } catch (error) {
      console.error('Token not stored', { error });
    }
  }

  handleSignUp = () => {
    this.setState({ loading: true });
    console.log('inside validate phone phone is ', phone);
    let {
      avatar,
      lastname,
      firstname,
      password,
      email,
      phone,
      username,
      dob
    } = this.state;

    // this.props.navigation.navigate('Home');

    SqulptrInstance.post('/signup', {
      avatar,
      firstname,
      lastname,
      password,
      email,
      username,
      dob,
      phone
    })
      .then(response => {
        console.log('response is ', response.data);
        this.storeToken(response.data.token);
        this.setState({ loading: false });
        this.props.navigation.navigate('Home', {
          avatar,
          firstname,
          lastname,
          username
        });
      })
      .catch(err => {
        // console.log({ err: err.response.data.message });
        console.log(err.response);
        this.setState({ loading: false });
      });
  };

  setName(key, value) {
    value = value.trim();

    let error = '';
    if (!value) {
      error = `${key} is required`;
    }

    this.setState({
      [key]: value,
      [`${key}Error`]: error,
    });
  }

  setEmail(value) {
    value = value.trim().toLowerCase();

    let error = '';
    if (!value) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = 'Email is not valid';
    }

    this.setState({ email: value, emailError: error });
  }

  setPassword(password) {
    password = password.trim();

    let error = '';
    if (!password) {
      error = 'Your password is required';
    } else if (password.length < 6) {
      error = 'Password should be at least 6 characters';
    }

    this.setState({ password, passwordError: error });
  }
  
  setBirthDatePickerVisibility(visibility) {
    const { dob } = this.state;

    let dobError = '';
    if (visibility === false && !dob) {
      dobError = 'You date of birth is required';
    }

    this.setState({
      birthDatePickerVisible: visibility,
      dobError,
    });
  }

  onDateOfBirthSelected(date) {
    this.setState({ dob: date, dobError: '', }, () => {
      this.setBirthDatePickerVisibility(false);
    });
  }

  formatDate(date) {
    date = new Date(date);

    const day = date.getDate();
    const month = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ][date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  render() {
    let { navigate } = this.props.navigation;
    let {
      avatar,
      lastname,
      firstname,
      password,
      email,
      phone,
      username,
      dob,
      avatarError,
      firstnameError,
      lastnameError,
      usernameError,
      emailError,
      passwordError,
      dobError,
      birthDatePickerVisible,
      loading,
    } = this.state;
    let isButtonEnabled =
      (avatar && !avatarError)
      && (firstname && !firstnameError)
      && (lastname && !lastnameError)
      && (password && !passwordError)
      && (email && !emailError)
      && phone
      && (username && !usernameError)
      && (dob && !dobError);
    console.log(this.state.avatar);

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView
          style={{ marginTop: 40, }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 25,
            paddingRight: 25,
            paddingBottom: 10,
          }}
        >
          <HeaderText>Build Profile</HeaderText>
          <BodyText>
            Enter one time 4-digit confirmation code sent to your phone number
          </BodyText>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AddPhoto onPress={() => this._pickImage()}>
              {avatar ? (
                <RoundedImage src={avatar} />
              ) : (
                <AddPhotoText>Add Photo</AddPhotoText>
              )}
            </AddPhoto>
            {avatarError ? <ErrorText>{avatarError}</ErrorText> : null}
          </View>

          <TextInputBox
            onChangeText={firstname => this.setName('firstname', firstname)}
            clearButtonMode="always"
            value={this.state.firstname}
            style={{ width: '100%' }}
            keyboardType="name-phone-pad"
            placeholder="First name"
            placeholderTextColor="#344148"
          />
          {firstnameError ? <ErrorText>{firstnameError}</ErrorText> : null}
          <TextInputBox
            onChangeText={lastname => this.setName('lastname', lastname)}
            clearButtonMode="always"
            value={this.state.lastname}
            style={{ width: '100%' }}
            keyboardType="name-phone-pad"
            placeholder="Last name"
            placeholderTextColor="#344148"
          />
          {lastnameError ? <ErrorText>{lastnameError}</ErrorText> : null}
          <TextInputBox
            onChangeText={username => this.setName('username', username)}
            clearButtonMode="always"
            value={this.state.username}
            style={{ width: '100%' }}
            keyboardType="name-phone-pad"
            placeholder="Username"
            placeholderTextColor="#344148"
          />
          {usernameError ? <ErrorText>{usernameError}</ErrorText> : null}
          <TextInputBox
            onChangeText={email => this.setEmail(email)}
            clearButtonMode="always"
            value={this.state.email}
            style={{ width: '100%' }}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#344148"
          />
          {emailError ? <ErrorText>{emailError}</ErrorText> : null}
          <TextInputBox
            onChangeText={password => this.setPassword(password)}
            clearButtonMode="always"
            value={this.state.password}
            secureTextEntry={true}
            style={{ width: '100%' }}
            placeholder="Password"
            placeholderTextColor="#344148"
          />
          {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
          <TextInputBox
            onChangeText={phone => this.setState({ phone })}
            clearButtonMode="always"
            value={this.state.phone}
            style={{ width: '100%' }}
            keyboardType="phone-pad"
            placeholder="Phone"
            placeholderTextColor="#344148"
          />
          <DatePicker
            clearButtonMode="always"
            style={{ width: '100%' }}
            onPress={() => this.setBirthDatePickerVisibility(true)}
          >
            <Text style={{ color: '#344148' }}>
              {dob ? this.formatDate(dob) : 'Date of Birth'}
            </Text>
          </DatePicker>
          {dobError ? <ErrorText>{dobError}</ErrorText> : null}
          <DateTimePicker
            isVisible={birthDatePickerVisible}
            onConfirm={date => this.onDateOfBirthSelected(date)}
            onCancel={() => this.setBirthDatePickerVisibility(false)}
            maximumDate={new Date()}
            {...(
              dob ? {
                date: new Date(dob)
              } : {}
            )}
          />
          <Button
            disabled={!isButtonEnabled}
            title="Continue"
            color={Colors.squlptr}
            isLoading={loading}
            onPress={this.handleSignUp}
            style={{ width: '100%' }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const TextInputBox = styled.TextInput`
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 15px;
  margin-top: 15px;
`;

const DatePicker = styled.TouchableOpacity`
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-size: 12px;
  color: #c00;
  margin-top: 5px;
`;

export default BuildProfile;
