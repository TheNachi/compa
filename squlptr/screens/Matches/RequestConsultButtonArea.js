import React from 'react';
import { View } from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

export default () => (
  <View
    style={{
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 20,
      paddingBottom: 20,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: Colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }}
  >
    <Button
      title="Request Consult"
      color={Colors.squlptr}
      style={{
        width: '100%',
        marginTop: 0,
      }}
    />
  </View>
);
