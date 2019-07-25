import React, { Component } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import LogoTitle from '../../components/LogoTitle';
import Card from './Card';
import CardNoSlider from './CardNoSlider';
import CustomButton from './ImageActionButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
        onPress={() => navigation.goBack(null)}
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

  state = {
    pictures: [
      {
        id: 1,
        before: require('../../assets/images/samples/picture1-before.jpg'),
        after: require('../../assets/images/samples/picture1-after.jpg'),
      },
      {
        id: 2,
        before: require('../../assets/images/samples/picture2-before.jpg'),
        after: require('../../assets/images/samples/picture2-after.jpg'),
      },
    ],
    cardSliderTranslate: new Animated.ValueXY(),
  }

  onSwiping(dx) {
    const { cardSliderTranslate } = this.state;

    cardSliderTranslate.setValue({
      x: dx,
      y: cardSliderTranslate.y,
    });
  }

  onSwipingStopped() {
    const { cardSliderTranslate } = this.state;

    cardSliderTranslate.setValue({
      x: 0,
      y: cardSliderTranslate.y,
    });
  }

  getCard(currentPicture, currentIndex, picturesLength) {
    const { cardSliderTranslate } = this.state;

    return (currentIndex < picturesLength - 1) ? (
      <CardNoSlider
        key={currentIndex}
        afterImageSrc={currentPicture.after}
        style={styles.card}
      />
    ) : (
      <Animated.View
        key={currentIndex}
        style={{
          ...styles.card,
          width: '100%',
          height: '100%',
          transform: [
            {
              translateX: cardSliderTranslate.x,
            },
            {
              rotate: cardSliderTranslate.x.interpolate({
                inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
                outputRange: ['-10deg', '0deg', '10deg'],
              }),
            }
          ]
        }}
      >
        <Card
          beforeImageSrc={currentPicture.before}
          afterImageSrc={currentPicture.after}
          style={styles.card}
          touchListener={(dx) => this.onSwiping(dx)}
          releaseListener={() => this.onSwipingStopped()}
        />
      </Animated.View>
    )
  }

  render() {
    const { pictures } = this.state;

    return (
      <SwipingGalleryContainer>
        <CardsContainer>
          {pictures.map((picture, index) => this.getCard(picture, index, pictures.length))}
        </CardsContainer>
        <View>
          <PictureActionButtons>
            <CustomButton style={styles.dislikeButton} activeStyle={styles.dislikeButtonActive}>
              <Feather name="x" size={35} color="#c00" />
            </CustomButton>

            <TouchableOpacity>
              <MaterialIcons name="star" size={20} color="#C4C4C4" />
            </TouchableOpacity>

            <CustomButton style={styles.likeButton} activeStyle={styles.likeButtonActive}>
              <Feather name="check" size={35} color="#27AE60" />
            </CustomButton>
          </PictureActionButtons>
          <View style={styles.surgeryType}>
            <Text style={{ textAlign: 'center' }}>Lip Filler</Text>
          </View>
        </View>
      </SwipingGalleryContainer>
    );
  }
}

const SwipingGalleryContainer = styled.View`
  padding: 10px 8px  0 8px;
`;

const PictureActionButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15% 0 15%;
`;

const CardsContainer = styled.View`
  position: relative;
  height: 500px;
`;

const pictureActionBtnStyle = {
  fontWeight: 'bold',
  width: 60,
  height: 60,
  borderRadius: 50,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dislikeButton: {
    ...pictureActionBtnStyle,
  },
  dislikeButtonActive: {
    ...pictureActionBtnStyle,
    backgroundColor: '#FFCECE',
  },
  likeButton: {
    ...pictureActionBtnStyle,
  },
  likeButtonActive: {
    ...pictureActionBtnStyle,
    backgroundColor: '#BEF1C3',
  },
  surgeryType: {
    width: '100%',
  }
});
