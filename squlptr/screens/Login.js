import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import Button from '../components/Button';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          <Logo
            style={{ resizeMode: 'contain' }}
            source={require('../assets/images/logo.png')}
            resizeMode="contain"
          />

          <Button
            title="Continue with Facebook"
            color={Colors.facebook}
            icon="facebook"
          />
          <Button
            title="Continue with Google"
            color={Colors.google}
            icon="google"
            wrapStyle={{ marginLeft: -15 }}
          />
          <Button title="Use Phone Number" color={Colors.squlptr} />
        </View>
      </ScrollView>
    </View>
  );
}

RegisterScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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

const Logo = styled.Image`
  height: 90px;
  width: 259px;
  margin-bottom: 11px;
`;
