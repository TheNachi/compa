import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export default StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F9FA',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column', 
  },
  defaultSettingListItemDim: {
    height: 46,
  },
});

export const SettingListItem = styled.View`
  padding-left: 25px;
  padding-right: 25px;
`;

export const SettingListItemTouchable = styled.TouchableOpacity`
  padding-left: 25px;
  padding-right: 25px;
`;

export const SettingListItemDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #DCDCDC;
  margin-left: 25px;
`;