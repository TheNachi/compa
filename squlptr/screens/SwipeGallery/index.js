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
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
        before: require('../../assets/images/samples/picture3-before.jpg'),
        after: require('../../assets/images/samples/picture3-after.jpg'),
      },
      {
        id: 2,
        before: require('../../assets/images/samples/picture2-before.jpg'),
        after: require('../../assets/images/samples/picture2-after.jpg'),
      },
      {
        id: 3,
        before: require('../../assets/images/samples/picture1-before.jpg'),
        after: require('../../assets/images/samples/picture1-after.jpg'),
      },
      {
        id: 4,
        before: require('../../assets/images/samples/picture2-before.jpg'),
        after: require('../../assets/images/samples/picture2-after.jpg'),
      },
    ],
    cardSliderTranslate: new Animated.ValueXY(),
    actionToPerform: null,
    isSwiping: false,
  }

  componentDidMount() {
    const { cardSliderTranslate } = this.state;

    // On x movement.
    cardSliderTranslate.x.addListener(() => this.onTranslateChange());
    // On y movement.
    cardSliderTranslate.y.addListener(() => this.onTranslateChange());
  }

  onTranslateChange() {
    let { cardSliderTranslate, isSwiping } = this.state;
    let actionToPerform = null;

    const { x, y } = cardSliderTranslate.__getValue();
    if (y <= (SCREEN_HEIGHT*0.38)*-1) {
      actionToPerform = 'favorite';
    } else if (Math.abs(x) >= (SCREEN_WIDTH / 4)) {
      actionToPerform = x < 0 ? 'dislike' : 'like';
    }

    isSwiping = x != 0 || y != 0;

    this.setState({ actionToPerform, isSwiping });
  }

  onSwiping(dx, dy) {
    const { cardSliderTranslate } = this.state;

    const x = dx;
    let y = 0;

    if (this.cardsHeight + dy < this.cardsHeight) {
      y = dy;
    }

    cardSliderTranslate.setValue({ x, y });
  }

  onSwipingStopped() {
    const { cardSliderTranslate, actionToPerform } = this.state;

    if (actionToPerform) {
      this.removeDisplayedPicture();
    }

    cardSliderTranslate.setValue({
      x: 0,
      y: 0,
    });
  }

  autoSwipeLeft() {
    if (this.state.isSwiping) {
      return false; // Prevent the button from working when the image is auto animating to prevent unexpected results.
    }

    Animated.timing(
      this.state.cardSliderTranslate.x,
      {
        toValue: (SCREEN_WIDTH)*-1,
        duration: 600,
      }
    ).start(() => this.onSwipingStopped('dislike'));
  }

  autoSwipeRight() {
    if (this.state.isSwiping) {
      return false; // Prevent the button from working when the image is auto animating to prevent unexpected results.
    }

    Animated.timing(
      this.state.cardSliderTranslate.x,
      {
        toValue: (SCREEN_WIDTH),
        duration: 600,
      }
    ).start(() => this.onSwipingStopped('like'));
  }

  autoSwipeUp() {
    if (this.state.isSwiping) {
      return false; // Prevent the button from working when the image is auto animating to prevent unexpected results.
    }

    Animated.timing(
      this.state.cardSliderTranslate.y,
      {
        toValue: (SCREEN_HEIGHT*0.8)*-1,
        duration: 750,
      }
    ).start(() => this.onSwipingStopped('favorite'));
  }

  removeDisplayedPicture() {
    const { pictures } = this.state;
    pictures.shift();

    this.setState({ pictures });
  }

  getCard(currentPicture, currentIndex, picturesLength) {
    const { cardSliderTranslate, actionToPerform, isSwiping } = this.state;

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
              translateY: cardSliderTranslate.y,
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
          ref={(ref) => this.currentSwipableCard = ref}
          beforeImageSrc={currentPicture.before}
          afterImageSrc={currentPicture.after}
          style={styles.card}
          touchListener={(dx, dy) => this.onSwiping(dx, dy)}
          releaseListener={() => this.onSwipingStopped()}
          actionToPerform={actionToPerform}
          isSwiping={isSwiping}
        />
      </Animated.View>
    )
  }

  render() {
    const { pictures } = this.state;

    if (pictures.length == 0) {
      return (
        <Text style={{
          padding: 20
        }}>Hi there! based on your choices, I will be your surgeon.</Text>
      );
    }

    return (
      <SwipingGalleryContainer>
        <CardsContainer
          ref={(ref) => this.cardsContainer = ref}
          onLayout={(evt) => this.cardsHeight = evt.nativeEvent.layout.height}
        >
          {[...pictures].reverse().map((picture, index) => this.getCard(picture, index, pictures.length))}
        </CardsContainer>
        <View>
          <PictureActionButtons>
            <CustomButton style={styles.dislikeButton} activeStyle={styles.dislikeButtonActive} onClick={() => this.autoSwipeLeft()}>
              <Feather name="x" size={35} color="#c00" />
            </CustomButton>

            <CustomButton onClick={() => this.autoSwipeUp()}>
              <MaterialIcons name="star" size={20} color="#C4C4C4" />
            </CustomButton>

            <CustomButton style={styles.likeButton} activeStyle={styles.likeButtonActive} onClick={() => this.autoSwipeRight()}>
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
  height: 100%;
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
  height: 80%;
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
