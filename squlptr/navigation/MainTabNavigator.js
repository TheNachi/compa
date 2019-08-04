import React from 'react';
import {
  createStackNavigator,
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
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons
} from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

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

// export const PhotoStack = createStackNavigator({
//   Links: Favourite
// });

// PhotoStack.navigationOptions = {
//   tabBarLabel: 'Favourite',
//   tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="heart" />,
//   drawerLabel: 'My Photos',
//   drawerIcon: () => <Feather name="user" size={20} />
// };

const FabStack = createStackNavigator({
  Links: () => null
});

FabStack.navigationOptions = {
  tabBarLabel: 'Fav',
  title: 'Fav',
  tabBarIcon: focused => <AddButton focused={focused} />,
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
  Profile: Profile
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

class AddButton extends React.Component {
  state = {
    clicked: false
  };
  render() {
    let { clicked } = this.state;
    return (
      <>
        {clicked && (
          <View
            style={{
              height: 55,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              position: 'absolute',
              width: width - 150,
              top: -60,
              left: -100,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFEFE0',
              flexDirection: 'row',
              paddingHorizontal: 15
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                backgroundColor: Colors.squlptr,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View>
                <Image
                  source={require('../assets/images/white-head.png')}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                backgroundColor: Colors.squlptr,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View>
                <Image
                  source={require('../assets/images/white-breasts.png')}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                backgroundColor: Colors.squlptr,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View>
                <Image
                  source={require('../assets/images/white-body.png')}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                backgroundColor: Colors.squlptr,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View>
                <Image
                  source={require('../assets/images/white-non.png')}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => this.setState({ clicked: !this.state.clicked })}
          activeOpacity={1}
          style={
            clicked
              ? {
                  borderRadius: 50,
                  height: 60,
                  width: 60,
                  backgroundColor: '#FFEFE0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -10
                }
              : {}
          }
        >
          {clicked ? (
            <>
              <Image
                style={{
                  position: 'absolute',
                  top: -1,
                  right: 15,
                  height: 40,
                  zIndex: 1
                }}
                source={require('../assets/images/left-curve.png')}
              />
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2
                }}
              >
                <TabBarIcon name="x" />
              </View>
              <Image
                style={{
                  position: 'absolute',
                  top: -1,
                  left: 15,
                  height: 30,
                  zIndex: 1
                }}
                source={require('../assets/images/right-curve.png')}
              />
            </>
          ) : (
            <TabBarIcon name="dots-horizontal" />
          )}
        </TouchableOpacity>
      </>
    );
  }
}
