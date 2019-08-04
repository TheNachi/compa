import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  SafeAreaView,
  DrawerItems
} from 'react-navigation';
import { Text, ScrollView, Image, View } from 'react-native';
import styled from 'styled-components';
import MainTabNavigator, {
  MyDrawerNavigator,
  AppointmentStack,
  FavoriteStack,
  ChatStack,
  HelpStack,
  ProfileStack
  // PhotoStack
} from './MainTabNavigator';
import Register from '../screens/Login';
import PhoneNumber from '../screens/Auth/Phone/PhoneNumber';
import ConfirmCode from '../screens/Auth/Phone/ConfirmCode';
import BuildProfile from '../screens/BuildProfile';
import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import AuthLoadingScreen from '../screens/Auth/AuthLoading';

const ProfileImage = styled.TouchableOpacity`
  height: 60;
  width: 60;
  border-radius: 50;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProfileHeaderText = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: #243c58;
`;

const ProfileSubText = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #344148;
`;

const CustomDrawer = props => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#fff',
      // borderWidth: 2,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      paddingLeft: 25,
      paddingTop: 28
    }}
  >
    <ScrollView>
      <ProfileImage activeOpacity={0.6}>
        <Image
          style={{
            height: '100%',
            width: '100%'
          }}
          resizeMode="cover"
          source={{
            uri:
              'https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
          }}
        />
      </ProfileImage>
      <View>
        <ProfileHeaderText>Carey Right</ProfileHeaderText>
        <ProfileSubText>@careyright</ProfileSubText>
      </View>
      <DrawerItems {...props} />
      <Button
        title="Log out"
        color={Colors.squlptr}
        style={{ width: '85%', height: 42 }}
        onPress={this.handleSaveEdit}
      />
    </ScrollView>
  </SafeAreaView>
);

const AuthNavigator = createStackNavigator({
  RegisterScreen: Register,
  PhoneNumberScreen: PhoneNumber,
  ConfirmCodeScreen: ConfirmCode
});

const BuildProfileNavigator = createStackNavigator({
  BuildProfileScreen: BuildProfile
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: MainTabNavigator,
    // 'My Photos': PhotoStack,
    Favourites: FavoriteStack,
    Appointments: AppointmentStack,
    Chat: ChatStack,
    Help: HelpStack,
    Settings: ProfileStack
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'transparent',
    contentComponent: CustomDrawer,
    hideTabBar: false
    // contentOptions: { itemsContainerStyle: { backgroundColor: 'red' } }
  }
);

// const AppDrawerNavigator = MyDrawerNavigator;

export default createAppContainer(
  createSwitchNavigator(
    {
      // Drawer: MyDrawerNavigator,
      AuthLoading: AuthLoadingScreen,
      Auth: AuthNavigator,
      BuildProfileScreen: BuildProfileNavigator,
      // App: AppNavigator,
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: AppDrawerNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
