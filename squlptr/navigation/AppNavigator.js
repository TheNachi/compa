import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Register from '../screens/Login';
import PhoneNumber from '../screens/Auth/PhoneNumber';

const AuthNavigator = createStackNavigator(
  {
    RegisterScreen: Register,
    PhoneNumberScreen: PhoneNumber
  }
  // { initialRouteName: 'PhoneNumberScreen' }
);

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthNavigator,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);
