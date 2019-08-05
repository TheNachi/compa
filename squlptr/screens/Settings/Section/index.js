import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';

export default ({ header, style, children }) => (
  <View style={style ? style : undefined}>
    {header && (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{header}</Text>
    </View>
    )}
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 8,
  },
  sectionHeaderText: {
    color: '#828282',
    fontSize: 12,
    marginLeft: 25,
  },
  sectionBody: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  }
});
