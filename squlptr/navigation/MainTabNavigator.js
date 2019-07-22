import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import Colors from '../constants/Colors';
import Profile from '../screens/Profile';

const HomeStack = createStackNavigator({
  Home: Home
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="tv" />
};

const AppointmentStack = createStackNavigator({
  Links: Appointments
});

AppointmentStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar" />
};

const FavoriteStack = createStackNavigator({
  Links: Appointments
});

FavoriteStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="heart" />
};

const FabStack = createStackNavigator({
  Links: Appointments
});

FabStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="dots-horizontal" />
  )
};

const ProfileStack = createStackNavigator({
  Profile: Profile
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />
};

export default createBottomTabNavigator(
  {
    HomeStack,
    AppointmentStack,
    FabStack,
    FavoriteStack,
    ProfileStack
  },
  { initialRouteName: 'ProfileStack' },
  {
    resetOnBlur: true,
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: Colors.squlptr,
      showLabel: false,
      style: { backgroundColor: '#fff', borderTopColor: 'transparent' }
    }
  }
);
