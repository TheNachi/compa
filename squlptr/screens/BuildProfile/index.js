import React from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
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
    lastname: '',
    firstname: '',
    password: '',
    email: '',
    phone: '',
    username: '',
    dob: '',
    loading: false
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    debugger;
    console.log('image result is ', result);

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
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
        console.log({ err });
        this.setState({ loading: false });
      });
  };

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
      loading
    } = this.state;
    let isButtonEnabled =
      !!lastname &&
      !!firstname &&
      !!password &&
      !!email &&
      !!phone &&
      !!username &&
      !!dob;
    console.log(this.state.avatar);

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 10 }}
        >
          <CloseWrap>
            <TouchableOpacity onPress={() => this.props.navigation.goback()}>
              <Icon name="close" size={40} style={{ color: Colors.squlptr }} />
            </TouchableOpacity>
          </CloseWrap>
          <HeaderText>Build Profile</HeaderText>
          <BodyText>
            Enter one time 4-digit confirmation code sent to your phone number
          </BodyText>

          {avatar && <RoundedImage src={avatar} />}
          {!avatar && (
            <AddPhoto onPress={() => this._pickImage()}>
              <AddPhotoText>Add Photo</AddPhotoText>
            </AddPhoto>
          )}
          <TextInputBox
            onChangeText={firstname => this.setState({ firstname })}
            clearButtonMode="always"
            value={this.state.firstname}
            style={{ width: '80%' }}
            keyboardType="name-phone-pad"
            placeholder="First name"
          />
          <TextInputBox
            onChangeText={lastname => this.setState({ lastname })}
            clearButtonMode="always"
            value={this.state.lastname}
            style={{ width: '80%' }}
            keyboardType="name-phone-pad"
            placeholder="Last name"
          />
          <TextInputBox
            onChangeText={username => this.setState({ username })}
            clearButtonMode="always"
            value={this.state.username}
            style={{ width: '80%' }}
            keyboardType="name-phone-pad"
            placeholder="username"
          />
          <TextInputBox
            onChangeText={email => this.setState({ email })}
            clearButtonMode="always"
            value={this.state.email}
            style={{ width: '80%', marginBottom: 5 }}
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInputBox
            onChangeText={password => this.setState({ password })}
            clearButtonMode="always"
            value={this.state.password}
            secureTextEntry={true}
            style={{ width: '80%', marginBottom: 5 }}
            placeholder="password"
          />
          <TextInputBox
            onChangeText={phone => this.setState({ phone })}
            clearButtonMode="always"
            value={this.state.phone}
            style={{ width: '80%', marginBottom: 5 }}
            keyboardType="phone-pad"
            placeholder="phone"
          />
          <TextInputBox
            onChangeText={dob => this.setState({ dob })}
            clearButtonMode="always"
            value={this.state.dob}
            style={{ width: '80%', marginBottom: 5 }}
            keyboardType="numbers-and-punctuation"
            placeholder="dob"
          />
          <Button
            isabled={!isButtonEnabled}
            title="Continue"
            color={Colors.squlptr}
            isLoading={loading}
            onPress={this.handleSignUp}
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

export default BuildProfile;
