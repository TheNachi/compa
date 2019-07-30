import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import RoundedImage from '../../components/RoundedImage';

export default ({ number, imageSrc, name, company }) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.inner}>
      <Text style={styles.number}>{number}</Text>
      <RoundedImage src={imageSrc} style={styles.profilePicture} />
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.company}>{company}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  inner: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 20,
  },
  nameWrapper: {
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  company: {
    color: '#777885',
    fontSize: 13,
  }
});
