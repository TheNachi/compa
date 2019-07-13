import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import DocCard from '../../components/DocCard';
import LogoTitle from '../../components/LogoTitle';

export default class Appointments extends React.Component {
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
    let { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <HeaderText>Appointments</HeaderText>
          <DocCard
            name="Dr Charles Darwin"
            clinic="Alba Plastic Surgery and med spa"
            thumbnail="https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            status="Approved"
            hasAppointment={true}
            hasVideo={false}
          />
          <DocCard
            name="Dr Emma Isidi"
            clinic="Alba Plastic Surgery and med spa"
            thumbnail="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            status="Approved"
            hasAppointment={true}
            hasVideo={false}
          />
          <DocCard
            name="Dr Jane Doe"
            clinic="Alba Plastic Surgery and med spa"
            thumbnail="https://images.unsplash.com/photo-1523661149972-0becaca2016e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=914&q=80"
            status="Pending"
            hasAppointment={true}
          />
          <DocCard
            name="Dr Fari Wils"
            clinic="Meta Plastic Surgery"
            thumbnail="https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            status="Pending"
            hasAppointment={true}
          />
        </View>
      </ScrollView>
    );
  }
}

const HeaderText = styled.Text`
  font-weight: 800;
  font-size: 22px;
  line-height: 30px;
  color: #344148;
  margin-left: 25px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
