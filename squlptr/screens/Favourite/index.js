import React from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions
} from 'react-native';
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from 'react-navigation';
import Colors from '../../constants/Colors';
import LogoTitle from '../../components/LogoTitle';
import Pill from '../../components/Pill';
import Button from '../../components/Button';
import { SwitchIcon } from '../../assets/icons';

const { width, height } = Dimensions.get('window');

export default class Favourite extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: <LogoTitle />,
    headerRight: (
      <TouchableOpacity style={{ marginRight: 25 }}>
        <MaterialIcons name="mode-comment" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={{ marginLeft: 25 }}
      >
        <Feather name="align-left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr
    },
    headerTintColor: '#fff'
  });

  state = {
    favourites: [
      {
        id: 1,
        uri:
          'https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 2,
        uri:
          'https://images.unsplash.com/photo-1561196470-073aadc339e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 3,
        uri:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 4,
        uri:
          'https://images.unsplash.com/photo-1561221821-24cd451ef705?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
      },
      {
        id: 5,
        uri:
          'https://images.unsplash.com/photo-1523661149972-0becaca2016e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=914&q=80'
      },
      {
        id: 6,
        uri:
          'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 7,
        uri:
          'https://images.unsplash.com/photo-1561196470-073aadc339e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 8,
        uri:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 9,
        uri:
          'https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 10,
        uri:
          'https://images.unsplash.com/photo-1561196470-073aadc339e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 11,
        uri:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      {
        id: 12,
        uri:
          'https://images.unsplash.com/photo-1561221821-24cd451ef705?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
      }
    ],
    isImageSelected: false,
    imageToDisplay: null
  };

  handleSelectImage = fav => {
    this.setState({ isImageSelected: true, imageToDisplay: fav });
  };

  handleDeleteImage = id => {
    let { favourites } = this.state;
    let _deletedImage = favourites.filter(value => value.id !== id);
    this.setState({
      favourites: _deletedImage,
      isImageSelected: false
    });
  };

  handleSwitch = img => {
    let { favourites, imageToDisplay } = this.state;
    let _id = imageToDisplay.id;
    if (_id === favourites.length) {
      _id = 0;
    }
    _id += 1;
    _favourites = favourites.filter(value => value.id === _id);

    this.setState({ imageToDisplay: _favourites[0] });
  };

  render() {
    let { favourites, isImageSelected } = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {isImageSelected === false && (
          <>
            <HeaderText>Favourites</HeaderText>
            <ImageBoxContainer>
              {favourites.map((fav, index) => (
                <ImageBox
                  onPress={() => this.handleSelectImage(fav)}
                  activeOpacity={0.5}
                  key={fav.id}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                    resizeMode="cover"
                    source={{
                      uri: fav.uri
                    }}
                  />
                </ImageBox>
              ))}
            </ImageBoxContainer>
          </>
        )}
        {this.state.isImageSelected && (
          <>
            <ViewImage>
              <Image
                style={{
                  height: '100%',
                  width: '100%'
                }}
                resizeMode="cover"
                source={{
                  uri: this.state.imageToDisplay.uri
                }}
              />
            </ViewImage>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                alignSelf: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 10
              }}
            >
              <TouchableOpacity
                onPress={() => this.handleSwitch(this.state.imageToDisplay)}
                style={{ height: 22, width: 22 }}
              >
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/images/3d.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.handleDeleteImage(this.state.imageToDisplay.id)
                }
              >
                <FontAwesome size={22} name="trash-o" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    );
  }
}

const ViewImage = styled.TouchableOpacity`
  width: 95%;
  height: ${height / 1.5};
  border-radius: 5px;
  align-self: center;
  overflow: hidden;
  margin-top: 10px;
`;

const HeaderText = styled.Text`
  font-weight: 800;
  font-size: 22px;
  line-height: 30px;
  color: #344148;
  margin-left: 25px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ImageBoxContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 5px;
`;

const ImageBox = styled.TouchableOpacity`
  border: 2px solid white;
  width: ${width / 3.1};
  height: 123px;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 25
  }
});
