import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import LogoTitle from '../../components/LogoTitle';
import ScreenHeader from '../Settings/Header';
import TextInputBox from '../../components/TextInputBox';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

export default class HelpScreen extends Component {

  state ={
    topics: [
      'Topic1',
      'Topic2',
      'Topic3',
    ],
    selectedTopicIndex: null,
  };

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
  
  render() {
    const { topics, selectedTopicIndex } = this.state;

    return (
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.scrollableContent}>
          <ScreenHeader text="Help" />

          <View
            style={styles.formView}
          >
            <TouchableOpacity
              style={styles.topicSelect}
              onPress={() => this.topicActionSheet.show()}
            >
              <Text
                style={{ color: selectedTopicIndex !== null ? '#000000' : '#344148' }}
              >{selectedTopicIndex !== null ? topics[selectedTopicIndex] : 'Topic'}</Text>
              <Feather name="chevron-down" color="#344148" size={27} />
            </TouchableOpacity>
            <ActionSheet
              ref={(e) => this.topicActionSheet = e}
              title="Select a Topic"
              options={[...topics, 'Cancel']}
              onPress={(index) => {
                if (index == topics.length) {
                  return;
                }
                
                this.setState({ selectedTopicIndex: index })
              }}
              cancelButtonIndex={topics.length}
            />

            <TextInputBox
              placeholder="Title"
              placeholderTextColor="#344148"
              style={{ marginTop: 10, }}
            />

            <TextInputBox
              placeholder="Details"
              placeholderTextColor="#344148"
              multiline={true}
              style={{ marginTop: 10, height: 216 }}
            />

            <Button
              title="Send"
              color={Colors.squlptr}
              style={{ marginTop: 25, width: '100%' }}
              onPress={() => Keyboard.dismiss()}
            />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F9FA',
  },
  scrollableContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  formView: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  topicSelect: {
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    height: 51,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
