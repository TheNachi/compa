import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet, View, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import LogoTitle from '../../components/LogoTitle';
import Pill from '../../components/Pill';
import DocCard from '../../components/DocCard';

export default class Home extends React.Component {
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
  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar barStyle="light-content" />
          <ImgBackground src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
          <SkillView>
            <Pill title="Breast Augmentation" />
            <Pill title="Lip Filler" background="rgba(194, 251, 255, 0.82)" />
            <Pill title="Liposuction" background="rgba(249, 216, 255, 0.82)" />
          </SkillView>
          <View style={{ paddingHorizontal: 25 }}>
            <DocCard
              name="Dr Charles Darwin"
              clinic="Alba Plastic Surgery and med spa"
              thumbnail="https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
              image="https://images.unsplash.com/photo-1561196470-073aadc339e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
              views={1092}
              hasVideo={true}
              style={styles.docCard}
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
            </DocCard>
            <DocCard
              name="Dr Emma Isidi"
              clinic="Alba Plastic Surgery and med spa"
              thumbnail="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
              views={2000}
              hasVideo={true}
              style={styles.docCard}
            >
              <>
                <DocImageWrap>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1561221821-24cd451ef705?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
                    }}
                  />
                </DocImageWrap>
                <DocTextSecondary>{`1092 views`}</DocTextSecondary>
              </>
            </DocCard>
            <DocCard
              name="Dr Jane Doe"
              clinic="Alba Plastic Surgery and med spa"
              thumbnail="https://images.unsplash.com/photo-1523661149972-0becaca2016e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=914&q=80"
              hasVideo={true}
              style={styles.docCard}
            >
              <>
                <DocImageWrap>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1557851831-1e9738c47f1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
                    }}
                  />
                </DocImageWrap>
                <DocTextSecondary>{`8000 views`}</DocTextSecondary>
              </>
            </DocCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const DocTextSecondary = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #8c8c8c;
`;

const DocImageWrap = styled.View`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const SkillView = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px 25px;
  justify-content: space-between;
`;

const ImgBackground = ({ src }) => (
  <View style={{ height: 300 }}>
    <ImgBg source={{ uri: src }} resizeMethod="auto" resizeMode="cover">
      <LinearGradient
        colors={[
          'rgba(246, 126, 0, 0)',
          'rgba(246, 126, 0, 0.3)',
          'rgba(246, 126, 0, 0.64)',
          'rgba(246, 126, 0, 0.64)'
        ]}
        style={styles.gradientStyle}
      >
        <ImgTextPrimary>Carery Right</ImgTextPrimary>
        <ImgTextSecondary>@careyright</ImgTextSecondary>
      </LinearGradient>
    </ImgBg>
  </View>
);

const ImgBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  position: relative;
`;

const ImgTextPrimary = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  text-align: center;
  color: ${Colors.white};
`;

const ImgTextSecondary = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${Colors.white};
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    paddingBottom: 15,
    justifyContent: 'flex-end'
  },
  docCard: {
    paddingHorizontal: 0
  }
});
