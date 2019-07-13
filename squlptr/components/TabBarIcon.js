import React from 'react';
import { View, Text } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Home } from '../assets/icons';

export default function TabBarIcon(props) {
  return (
    <>
      {props.name === 'dots-horizontal' ? (
        <MaterialCommunityIcons
          name={props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={props.focused ? Colors.squlptr : Colors.tabIconDefault}
        />
      ) : (
        <Feather
          name={props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={props.focused ? Colors.squlptr : Colors.tabIconDefault}
        />
      )}
    </>
  );
}
