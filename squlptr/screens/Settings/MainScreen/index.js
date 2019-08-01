import React, { Component } from 'react';
import { DrawerActions } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Slider
} from 'react-native';
import LogoTitle from '../../../components/LogoTitle';
import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';
import SettingsHeader from '../Header';
import Section from '../Section';
import Incrementer from '../Incrementer';
import settingStyles, {
  SettingListItem,
  SettingListItemTouchable,
  SettingListItemDivider,
} from '../styles';

export default class MainScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: <LogoTitle />,
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginLeft: 25 }}
      >
        <Feather name="align-left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr,
    }
  });

  state = {
    numSurgeons: 100,
    numPhotos: 100,
    maxDistance: 50,
  };

  showLocationSettings() {
    this.props.navigation.navigate('SurgeonsLocationScreen');
  }

  setNumSurgeonValue(numSurgeons) {
    this.setState({ numSurgeons });
  }

  setNumPhotoValue(numPhotos) {
    this.setState({ numPhotos  });
  }

  onMaxDistanceChanged(maxDistance) {
    this.setState({ maxDistance });
  }

  render() {
    const { numSurgeons, numPhotos, maxDistance } = this.state;

    return (
      <ScrollView style={settingStyles.scrollView}>
        <View style={settingStyles.flexColumn}>

          <SettingsHeader text="Settings" />

          <Section
            header="DISCOVERY"
            style={{
              marginTop: 20,
            }}
          >

            <SettingListItem
              style={{
                paddingTop: 15,
                paddingBottom: 1,
              }}
            >
              <View style={styles.settingsTextContainer}>
                <Text>Maximum Distance</Text>
                <Text style={styles.settingItemTextRight}>
                  {maxDistance}m
                </Text>
              </View>
              <Slider
                style={{
                  width: '100%',
                  marginTop: 8,
                }}
                minimumValue={1}
                maximumValue={150}
                value={maxDistance}
                minimumTrackTintColor={Colors.squlptr}
                maximumTrackTintColor="#E0E0E0"
                onValueChange={(value) => this.onMaxDistanceChanged(parseInt(value))}
              />
            </SettingListItem>

            <SettingListItemDivider />

            <SettingListItemTouchable
              style={[
                styles.settingsTextContainer,
                settingStyles.defaultSettingListItemDim,
              ]}
              onPress={() => this.showLocationSettings()}
            >
              <Text>Show Me Surgeons</Text>
              <View style={styles.settingItemTextRightWrapper}>
                <Text style={styles.settingItemTextRight}>In my location</Text>
                <Feather name="chevron-right" size={29} color="#BDBDBD" />
              </View>
            </SettingListItemTouchable>

            <SettingListItemDivider />

            <SettingListItem
              style={[
                styles.settingsTextContainer,
                settingStyles.defaultSettingListItemDim,
              ]}
            >
              <Text>Show Surgeons per Search</Text>
              <View style={styles.settingItemTextRightWrapper}>
                <Text style={styles.settingItemTextRight}>{numSurgeons}</Text>
                <Incrementer
                  style={{
                    marginLeft: 15,
                  }}
                  initialValue={numSurgeons}
                  minValue={90}
                  maxValue={110}
                  onValueChanged={(value) => this.setNumSurgeonValue(value)}
                />
              </View>
            </SettingListItem>

          </Section>

          <Section
            header="PHOTO SETTINGS"
            style={{ marginTop: 20, }}
          >
            <SettingListItem
              style={[
                styles.settingsTextContainer,
                settingStyles.defaultSettingListItemDim,
              ]}
            >
              <Text>Show Procedure Photos</Text>
              <View style={styles.settingItemTextRightWrapper}>
                <Text style={styles.settingItemTextRight}>{numPhotos}</Text>
                <Incrementer
                  style={{
                    marginLeft: 15,
                  }}
                  initialValue={numPhotos}
                  minValue={90}
                  maxValue={110}
                  onValueChanged={(value) => this.setNumPhotoValue(value)}
                />
              </View>
            </SettingListItem>
          </Section>

          <View style={styles.deleteBtnWrapper}>
            <Button
              title="Delete my Account"
              color={Colors.squlptr}
              style={styles.deleteBtn}
            />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  settingsTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingItemTextRightWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemTextRight: {
    color: '#828282',
  },
  deleteBtnWrapper: {
    marginTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  deleteBtn: {
    width: '100%',
    marginTop: 0,
  }
});
