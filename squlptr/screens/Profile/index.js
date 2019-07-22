import React from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import LogoTitle from '../../components/LogoTitle';
import Pill from '../../components/Pill';
import Button from '../../components/Button';

export default class Profile extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (
      <TouchableOpacity style={{ marginRight: 25 }}>
        <MaterialIcons name="mode-comment" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 25 }}>
        <Feather name="align-left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr
    },
    headerTintColor: '#fff'
  };

  state = {
    isEditing: false,
    user: {
      name: 'Carey Right',
      email: 'carey.right@gmail.com',
      phone: '+15558881234',
      gender: 'female'
    },
    interestValue: '',
    interests: ['Breast Augmentation', 'Lip Filler', 'Liposuction']
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleUpdateInterest = value => {
    this.setState({
      interestValue: value
    });
  };

  handleSubmitInterest = () => {
    let { interests, interestValue, user } = this.state;
    if (interestValue === '') return;
    this.setState({
      interests: interests.concat(interestValue),
      interestValue: ''
    });
  };

  handleDeleteInterest = interest => {
    let { interests } = this.state;
    let _interests = interests.filter(value => value !== interest);
    this.setState({
      interests: _interests
    });
  };

  handleSaveEdit = () => {
    this.setState({ isEditing: false });
  };

  handleChangeText = (name, value) => {
    let { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  // handleChangeText = (name, value) => {
  //   this.setState({ ...[name]: value });
  // };

  render() {
    let { navigate } = this.props.navigation;
    let { isEditing, interests, interestValue, user } = this.state;
    console.log(this.state);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <HeaderText>Profile</HeaderText>
          <View>
            <ProfileImageContainer>
              <ProfileImage activeOpacity={0.6}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100
                  }}
                  resizeMode="cover"
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
                  }}
                />
                <ProfileImageIcon>
                  <FontAwesome
                    name="plus"
                    style={{ color: '#fff' }}
                    size={15}
                  />
                </ProfileImageIcon>
              </ProfileImage>
              {isEditing === false && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <View>
                    <ProfileHeaderText>Carey Right</ProfileHeaderText>
                    <ProfileSubText>@careyright</ProfileSubText>
                  </View>
                  <TouchableOpacity
                    onPress={this.handleEdit}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <FontAwesome
                      name="pencil"
                      style={{ color: Colors.squlptr }}
                      size={15}
                    />
                    <ProfileEditText>Edit Profile</ProfileEditText>
                  </TouchableOpacity>
                </View>
              )}
            </ProfileImageContainer>
            <View>
              <HeaderText>Interests</HeaderText>
              <InterestsView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  paddingHorizontal: 25,
                  paddingVertical: 10
                }}
              >
                {interests.map((value, index) => (
                  <Pill
                    isDeletable={isEditing}
                    onDelete={() => this.handleDeleteInterest(value)}
                    key={index}
                    title={value}
                  />
                ))}
              </InterestsView>
              {isEditing === true && (
                <AddInterestWrap>
                  <TextInputBox
                    value={interestValue}
                    onChangeText={value => this.handleUpdateInterest(value)}
                  />
                  <Button
                    title="Add"
                    color={Colors.squlptr}
                    style={{ marginTop: 0, width: '30%', height: 42 }}
                    onPress={this.handleSubmitInterest}
                  />
                </AddInterestWrap>
              )}
            </View>
            <View>
              <HeaderText>Personal Information</HeaderText>
              <InfoContent>
                <InfoItem>
                  <InfoItemLabel>Name</InfoItemLabel>
                  {isEditing === false && (
                    <InfoItemValueBox>
                      <InfoItemValueText>{user.name}</InfoItemValueText>
                    </InfoItemValueBox>
                  )}
                </InfoItem>
                {isEditing === true && (
                  <TextInputBox
                    style={{ marginVertical: 5 }}
                    value={user.name}
                    onChangeText={value => this.handleChangeText('name', value)}
                  />
                )}
                <InfoItem>
                  <InfoItemLabel>Email</InfoItemLabel>
                  {isEditing === false && (
                    <InfoItemValueBox>
                      <InfoItemValueText>{user.email}</InfoItemValueText>
                    </InfoItemValueBox>
                  )}
                </InfoItem>
                {isEditing === true && (
                  <TextInputBox
                    style={{ marginVertical: 5 }}
                    keyboardType="email-address"
                    value={user.email}
                    onChangeText={value =>
                      this.handleChangeText('email', value)
                    }
                  />
                )}
                <InfoItem>
                  <InfoItemLabel>Phone</InfoItemLabel>
                  {isEditing === false && (
                    <InfoItemValueBox>
                      <InfoItemValueText>{user.phone}</InfoItemValueText>
                    </InfoItemValueBox>
                  )}
                </InfoItem>
                {isEditing === true && (
                  <TextInputBox
                    style={{ marginVertical: 5 }}
                    keyboardType="phone-pad"
                    value={user.phone}
                    onChangeText={value =>
                      this.handleChangeText('phone', value)
                    }
                  />
                )}
                <InfoItem>
                  <InfoItemLabel>Gender</InfoItemLabel>
                  {isEditing === false && (
                    <InfoItemValueBox>
                      <InfoItemValueText>{user.gender}</InfoItemValueText>
                    </InfoItemValueBox>
                  )}
                </InfoItem>
                {isEditing === true && (
                  <TextInputBox
                    value={user.gender}
                    onChangeText={value =>
                      this.handleChangeText('gender', value)
                    }
                  />
                )}
              </InfoContent>
            </View>
          </View>
          {isEditing && (
            <Button
              title="Save"
              color={Colors.squlptr}
              style={{ width: '85%', height: 42, marginHorizontal: 25 }}
              onPress={this.handleSaveEdit}
            />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const HeaderText = styled.Text`
  font-weight: 800;
  font-size: 22px;
  line-height: 30px;
  color: #344148;
  margin-left: 25px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ProfileImageContainer = styled.View`
  flex-direction: row;
  padding: 0 25px;
  justify-content: center;
  /* border: 1px solid red; */
`;

const ProfileImage = styled.TouchableOpacity`
  height: 100;
  width: 100;
  border-radius: 50;
  margin-right: 25;
  z-index: 1;
`;

const ProfileImageIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 26;
  width: 26;
  border-radius: 50;
  background-color: ${Colors.squlptr};
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
});

const ProfileHeaderText = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: #243c58;
`;

const ProfileSubText = styled.Text`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #344148;
`;

const ProfileEditText = styled.Text`
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  margin-left: 3px;
  color: ${Colors.squlptr};
`;

const InterestsView = styled.ScrollView`
  flex-direction: row;
  /* padding: 0 25px; */
  /* border-width: 2px; */
  margin-top: -10px;
`;

const InfoContent = styled.View`
  padding: 0 25px;
`;

const InfoItem = styled.View`
  /* border: 1px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoItemLabel = styled.Text`
  font-size: 14px;
  line-height: 17px;
  color: #344148;
  /* border: 1px; */
  flex: 0.5;
`;

const InfoItemValueText = styled.Text`
  font-size: 14px;
  line-height: 17px;
  color: #344148;
`;

const AddInterestWrap = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 25px;
  margin-top: 15px;
`;

const InfoItemValueBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  padding: 10px 0;
  flex: 1;
`;

const TextInputBox = styled.TextInput`
  border-radius: 12px;
  background-color: #d9d9d9;
  height: 42px;
  padding: 0 10px;
  flex: 1;
  margin-right: 15px;
`;
