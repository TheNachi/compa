import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import SettingsHeader from '../Header';
import Section from '../Section';
import LogoTitle from '../../../components/LogoTitle';
import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';
import settingsStyle, {
  SettingListItem,
  SettingListItemTouchable,
  SettingListItemDivider,
} from '../styles';

const USER_LOCATION = 'user_location';
const CUSTOM_LOCATION = 'custom_location';

export default class SurgeonsLocation extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: <LogoTitle />,
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack(null)}
        style={{ marginLeft: 25 }}
      >
        <Feather name="chevron-left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr,
    }
  });

  state = {
    searchIn: USER_LOCATION,
    showDoneBtn: false,
  };

  selectUserLocation() {
    this.setState({
      searchIn: USER_LOCATION,
      showDoneBtn: false,
    });
  }

  onLocationInputFocus() {
    this.setState({ showDoneBtn: true });
  }

  onLocationInputBlur() {
    this.setState({ showDoneBtn: false });
  }

  onLocationInputKeyPress(event) {}

  onDoneClicked() {
    Keyboard.dismiss();

    this.setState({
      searchIn: CUSTOM_LOCATION,
      showDoneBtn: false,
    });
  }

  render() {
    const { searchIn, showDoneBtn } = this.state;

    return (
      <ScrollView
        style={settingsStyle.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={settingsStyle.flexColumn}>

          <SettingsHeader text="Show Surgeons" />

          <Section
            style={{ marginTop: 20, }}
          >

            <SettingListItemTouchable
              style={[
                settingsStyle.defaultSettingListItemDim,
                styles.itemSpaceBetween
              ]}
              onPress={() => this.selectUserLocation()}
            >
              <Text>In my Location</Text>
              {searchIn === USER_LOCATION && <Feather name="check" size={25} color="#27AE60" />}
            </SettingListItemTouchable>

            <SettingListItemDivider />

            <SettingListItem
              style={styles.itemWithInput}
            >
              <TextInput
                style={[
                  { flex: 1 },
                  settingsStyle.defaultSettingListItemDim,
                ]}
                placeholder="Enter a Location"
                placeholderTextColor="#000000"
                onFocus={() => this.onLocationInputFocus()}
                onBlur={() => this.onLocationInputBlur()}
                onKeyPress={event => this.onLocationInputKeyPress(event)}
              />
              {searchIn === CUSTOM_LOCATION && <Feather name="check" size={25} color="#27AE60" />}
            </SettingListItem>

          </Section>

          {showDoneBtn && (
          <View style={styles.doneBtnWrapper}>
            <Button
              title="Done"
              color={Colors.squlptr}
              style={styles.doneBtn}
              onPress={() => this.onDoneClicked()}
            />
          </View>
          )}
        </View>
      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  itemSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemWithInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneBtnWrapper: {
    padding: 25,
  },
  doneBtn: {
    width: '100%',
    marginTop: 0,
  },
});
