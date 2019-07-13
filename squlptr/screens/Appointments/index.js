import React from 'react';
import styled, { css } from 'styled-components/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';
import { GestureHandler } from 'expo';
import Colors from '../../constants/Colors';
import RoundedImage from '../../components/RoundedImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { Swipeable } = GestureHandler;

export default class Appointments extends React.Component {
  render() {
    let { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>Appointments</Text>
          <Doc
            name="Dr Charles Darwin"
            clinic="Alba Plastic Surgery and med spa"
            thumbnail="https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            status="Approved"
            hasAppointment={true}
          />
          <Doc
            name="Dr Fari Wils"
            clinic="Meta Plastic Surgery"
            thumbnail="https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            status="Pending"
            hasVideo={true}
          >
            <>
              <DocImageWrap>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1561196470-073aadc339e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
                  }}
                />
              </DocImageWrap>
              <DocTextSecondary>{`1092 views`}</DocTextSecondary>
            </>
          </Doc>
        </View>
      </ScrollView>
    );
  }
}

class Doc extends React.Component {
  state = {
    bounceValue: new Animated.Value(55),
    showAppointment: true,
    istoggled: false
  };

  toggleCardView = () => {
    let initialValue = this.state.istoggled
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.istoggled
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      istoggled: !this.state.istoggled
    });

    // let toValue = 220;
    this.state.bounceValue.setValue(initialValue);
    Animated.spring(this.state.bounceValue, {
      toValue: finalValue,
      velocity: 3,
      bounciness: 2
      // useNativeDriver: true
    }).start();
  };

  _setMaxHeight = event => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  };

  _setMinHeight = event => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  };

  RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#FEECEC',
            height: 55,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 20
          }}
        >
          <Animated.Text
            style={[{ color: '#EB5757' }, { transform: [{ scale }] }]}
          >
            Cancel
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let {
      thumbnail,
      name,
      clinic,
      status,
      hasVideo,
      hasAppointment
    } = this.props;
    let { bounceValue, istoggled } = this.state;
    return (
      <Swipeable
        renderRightActions={
          hasVideo ? null : istoggled ? null : this.RightActions
        }
      >
        <Animated.View
          style={[
            {
              marginBottom: 5,
              paddingHorizontal: 25,
              overflow: 'hidden',
              backgroundColor: istoggled ? '#F4F4F4' : '#fff'
            },
            { height: hasVideo ? 'auto' : bounceValue }
          ]}
          onPress={this.toggleCardView}
        >
          <DocHeader
            style={{ borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}
            disabled={!hasAppointment}
            onLayout={this._setMinHeight}
            onPress={this.toggleCardView}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}
            >
              <RoundedImage src={thumbnail} />
              <DocTextWrap>
                <DocTextPrimary>{name}</DocTextPrimary>
                <DocTextSecondary>{clinic}</DocTextSecondary>
              </DocTextWrap>
            </View>
            {status && <DocStatus status={status}>{status}</DocStatus>}
          </DocHeader>
          {hasAppointment && (
            <View style={{ height: 180 }} onLayout={this._setMaxHeight}>
              <AppointmentCard />
            </View>
          )}
          {this.props.children}
        </Animated.View>
      </Swipeable>
    );
  }
}

const ListItem = ({ text, onSwipeFromLeft, onRightPress }) => {
  <View>
    <Text>H</Text>
  </View>;
};

const AppointmentCard = () => (
  <AppointmentCardStyle>
    <AppointmentCardHeaderWrap>
      <AppointmentCardHeaderDetail
        style={{ borderRightWidth: 1, borderRightColor: '#219653' }}
      >
        <DetailHeader>Date</DetailHeader>
        <DetailBody>Oct 2, 1980</DetailBody>
      </AppointmentCardHeaderDetail>
      <AppointmentCardHeaderDetail>
        <DetailHeader>Time</DetailHeader>
        <DetailBody>12:20 PM</DetailBody>
      </AppointmentCardHeaderDetail>
    </AppointmentCardHeaderWrap>
    <AppointmentCardBody>
      <AppointmentCardBodyHeader>Note</AppointmentCardBodyHeader>
      <AppointmentCardBodyText>
        Some sample text content here to show that notes can be added to the
        appointment
      </AppointmentCardBodyText>
    </AppointmentCardBody>
  </AppointmentCardStyle>
);

const AppointmentCardStyle = styled.View`
  background-color: #27ae60;
  border-radius: 12px;
  overflow: hidden;
`;

const AppointmentCardHeaderWrap = styled.View`
  background-color: #6fcf97;
  flex-direction: row;
`;

const AppointmentCardHeaderDetail = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px 0;
`;

const DetailHeader = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.white};
`;

const DetailBody = styled.Text`
  font-size: 14px;
  line-height: 17px;
  color: ${Colors.white};
`;

const AppointmentCardBody = styled.View`
  padding: 15px 25px;
`;

const AppointmentCardBodyHeader = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 25px;
  color: ${Colors.white};
`;

const AppointmentCardBodyText = styled.Text`
  font-size: 14px;
  line-height: 17px;
  color: ${Colors.white};
`;

const DocHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 15px; */
  justify-content: space-between;
  /* background: pink; */
`;

const DocTextWrap = styled.View`
  margin-left: 15px;
`;

const DocTextPrimary = styled.Text`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 3px;
`;

const DocTextSecondary = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #8c8c8c;
  margin-bottom: 5px;
`;

const DocImageWrap = styled.View`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const DocStatus = styled.Text`
  overflow: hidden;
  border-radius: 12px;
  background: #ffefe0;
  font-size: 12px;
  line-height: 14px;
  color: #f67e00;
  padding: 5px 10px;

  ${props =>
    props.status == 'Pending' &&
    css`
      background: #ffefe0;
      color: #f67e00;
    `}

  ${props =>
    props.status == 'Approved' &&
    css`
      background: #a7feb6;
      color: #219653;
    `}
`;

const SkillView = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px 25px;
  justify-content: space-between;
`;

const Pill = ({ title, background }) => (
  <PillStyle background={background}>
    <PillText>{title}</PillText>
  </PillStyle>
);

const PillStyle = styled.View`
  /* border: 1px solid red; */
  border-radius: 25px;
  padding: 8px 10px;
  background: ${props => (props.background ? props.background : '#FFEFE0')};
`;
const PillText = styled.Text`
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: #344148;
`;

const ImgBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  position: relative;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  contentContainer: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center'
  }
});
