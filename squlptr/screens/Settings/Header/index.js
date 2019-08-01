import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ text }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: '#344148',
    fontWeight: 'bold',
    fontSize: 24,
  }
});
