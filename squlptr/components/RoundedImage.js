import React from 'react';
import { View, Image } from 'react-native';

const RoundedImage = ({ src }) => (
  <View
    style={{
      height: 45,
      width: 45,
      borderRadius: 100,
      overflow: 'hidden'
    }}
  >
    <Image
      style={{
        height: '100%',
        width: '100%'
      }}
      resizeMode="cover"
      source={{ uri: src }}
    />
  </View>
);

export default RoundedImage;
