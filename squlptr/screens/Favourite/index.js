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
import Colors from '../../constants/Colors';
import LogoTitle from '../../components/LogoTitle';
import Pill from '../../components/Pill';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');

export default class Favourite extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (
      <TouchableOpacity style={{ marginRight: 25 }}>
        <MaterialIcons name="mode-comment" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 25 }}>
        <Feather name="align-left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr
    },
    headerTintColor: '#fff'
  };

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
    ]
  };

  render() {
    let { favourites } = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <HeaderText>Favourites</HeaderText>
        <ImageBoxContainer>
          {favourites.map((fav, index) => (
            <ImageBox activeOpacity={0.5} key={fav.id}>
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
      </ScrollView>
    );
  }
}

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
    backgroundColor: '#fff'
  }
});
