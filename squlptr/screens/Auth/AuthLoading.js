import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
// import { handleValidateToken } from '../../reducers/authReducer';
// import { handleFetchEvents } from '../../reducers/eventReducer';
import { Constants } from 'expo';
import Colors from '../../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const USER_TOKEN = 'USER_TOKEN';
class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    location: null,
    errorMessage: null
  };
  accessToken;
  userToken;

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    this._getLocationAsync();
    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _bootstrapAsync = async (shouldUpdate = false) => {
    this.accessToken = await AsyncStorage.getItem('access_token');
    this.userToken = await AsyncStorage.getItem(USER_TOKEN);

    if (!!this.userToken) {
      this.props.navigation.navigate('Home');
    } else if (!!this.accessToken) {
      this.props.navigation.navigate('BuildProfileScreen');
    } else {
      this.props.navigation.navigate('RegisterScreen');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            backgroundColor: Colors.squlptr,
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            resizeMode: 'cover'
          }}
          source={require('../../assets/images/splash.png')}
        />
        <ActivityIndicator
          size="large"
          color="#008C87"
          style={{ marginTop: 90 }}
        />
        <Text style={{ color: 'white', fontStyle: 'italic' }}>
          v{Constants.manifest.version}
        </Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AuthLoadingScreen;
