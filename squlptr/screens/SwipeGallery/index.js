import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import LogoTitle from '../../components/LogoTitle';
import Card from './Card';

export default class SwipingGallery extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: <LogoTitle />,
    headerRight: (
      <Text
        style={{ marginRight: 25, color: '#fff', fontWeight: '600' }}
      >
        47 <Text style={{ fontWeight: 'normal' }}>/</Text> 50
      </Text>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => alert('Hello')}
        style={{ marginLeft: 25 }}
      >
        <Feather name="chevron-left" color="#fff" size={35} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr
    },
    headerTintColor: '#fff',
  });

  render() {
    return (
      <SwipingGalleryContainer>
        <Card />
        <View>
          
        </View>
      </SwipingGalleryContainer>
    );
  }
}

const SwipingGalleryContainer = styled.View`
  padding: 10px 8px  0 8px;
  height: 500px;
`;
