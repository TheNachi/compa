import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import Colors from '../constants/Colors';
import Profile from '../screens/Profile';
import Favourite from '../screens/Favourite';
import SwipeGallery from '../screens/SwipeGallery';
import Help from '../screens/Help';
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons
} from '@expo/vector-icons';

const HomeStack = createStackNavigator({
  Home: Home
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="tv" />,
  drawerLabel: 'Homes',
  drawerIcon: () => <FontAwesome name="pencil" size={20} />
};

export const AppointmentStack = createStackNavigator({
  Links: Appointments
});

AppointmentStack.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar" />,
  drawerLabel: 'Appointments',
  drawerIcon: () => <MaterialCommunityIcons name="calendar-text" size={20} />
};

export const FavoriteStack = createStackNavigator({
  Links: Favourite
});

FavoriteStack.navigationOptions = {
  tabBarLabel: 'Favourite',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="heart" />,
  drawerLabel: 'Favourite',
  drawerIcon: () => <MaterialCommunityIcons name="heart-outline" size={20} />
};

export const PhotoStack = createStackNavigator({
  Links: Favourite
});

PhotoStack.navigationOptions = {
  tabBarLabel: 'Favourite',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="heart" />,
  drawerLabel: 'My Photos',
  drawerIcon: () => <Feather name="user" size={20} />
};

const FabStack = createStackNavigator({
  Links: SwipeGallery,
});

FabStack.navigationOptions = {
  tabBarLabel: 'Fav',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="dots-horizontal" />
  ),
  drawerLabel: 'Fav',
  drawerIcon: () => <MaterialCommunityIcons name="pencil" size={20} />
};

export const ProfileStack = createStackNavigator({
  Profile: Profile
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
  drawerLabel: 'Settings',
  drawerIcon: () => <SimpleLineIcons name="equalizer" size={20} />
};

export const ChatStack = createStackNavigator({
  Profile: Profile
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
  drawerLabel: 'Chat',
  drawerIcon: () => <MaterialIcons name="chat-bubble-outline" size={20} />
};

export const HelpStack = createStackNavigator({
  HelpScreen: Help
});

HelpStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
  drawerLabel: 'Help',
  drawerIcon: () => <MaterialCommunityIcons name="headphones" size={20} />
};

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Appointment: {
    screen: AppointmentStack
  },
  Favourite: {
    screen: FavoriteStack
  },
  Profile: {
    screen: ProfileStack
  }
});

export { MyDrawerNavigator };

export default createBottomTabNavigator(
  {
    HomeStack,
    AppointmentStack,
    FabStack,
    FavoriteStack,
    ProfileStack
  },
  // { initialRouteName: 'ProfileStack' },
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
