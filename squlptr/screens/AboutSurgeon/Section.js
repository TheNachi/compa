import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Icon } from '../../assets/icons';

export default ({ icon, header, children }) => (
  <View style={styles.container}>
    <View style={styles.sectionHeader}>
      <Icon name={icon} color={Colors.squlptr} />
      <Text
        style={styles.sectionHeaderText}
      >
        {header}
      </Text>
    </View>
    <View>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    backgroundColor: '#f2f2f2',
    paddingLeft: 25,
    paddingRight: 25,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    marginLeft: 13,
    color: '#344148',
    fontSize: 12,
  },
  sectionBody: {
    backgroundColor: Colors.white,
  }
});
