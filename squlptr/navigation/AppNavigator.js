import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Register from '../screens/Login';
import PhoneNumber from '../screens/Auth/Phone/PhoneNumber';
import ConfirmCode from '../screens/Auth/Phone/ConfirmCode';
import BuildProfile from '../screens/BuildProfile';

const AuthNavigator = createStackNavigator(
  {
    RegisterScreen: Register,
    PhoneNumberScreen: PhoneNumber,
    ConfirmCodeScreen: ConfirmCode,
    BuildProfileScreen: BuildProfile
  }
  // { initialRouteName: 'ConfirmCodeScreen' }
);

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthNavigator,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);
