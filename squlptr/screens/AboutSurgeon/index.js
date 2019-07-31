import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import LogoTitle from '../../components/LogoTitle';
import Button from '../../components/Button';
import Section from './Section';

export default class AboutSurgeon extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: <LogoTitle />,
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginLeft: 25 }}
      >
        <Feather name="align-left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.squlptr,
    } ,
    headerTintColor: Colors.white,
  });

  state = {
    user: {
      about: 'It is an honor to practice plastic surgery and I am thrilled to be able to do what I enjoy the most every single day. We strive to provide the safest and most comfortable experience during your surgery. I enjoy cosmetic surgery as a speciality that involves an artistic ability while improving the quality of people’s lives.',
      education: [
        'Cornell University B.S.',
        'Case Western Reserve School of Medicine M.D.',
        'Otolaryngology Residency Wayne State University',
        'Plastic Surgery Residency UT Southwestern',
      ],
      certifications: [
        'American Board of Otolaryngology',
        'American Board of Plastic Surgery',
      ],
      proMemberships: []
    }
  };

  render() {
    const { user } = this.state;

    return (
      <View
        style={[
          styles.container,
          {
            height: '100%',
          }
        ]}
      >
        <ScrollView
          style={styles.scrollView}
        >
          <View style={styles.container}>

            {/* Personal statement section */}
            <Section
              icon="user"
              header="PERSONAL STATEMENT"
            >
              <SectionTextWrapper>
                <Text style={styles.sectionText}>{user.about}</Text>
              </SectionTextWrapper>
            </Section>

            {/* Education section */}
            <Section
              icon="user"
              header="EDUCATION"
            >
              <ListItemContainer>
                {user.education.map((school, index) => (
                  <View key={index}>
                    <ListItem>
                      <Text>{school}</Text>
                    </ListItem>
                    {index < user.education.length - 1 && <ListItemDivider />}
                  </View>
                ))}
              </ListItemContainer>
            </Section>

            {/* Certifications section */}
            <Section
              icon="award"
              header="CERTIFICATIONS"
            >
              <ListItemContainer>
                {user.certifications.map((degree, index) => (
                  <View key={index}>
                    <ListItem>
                      <Text>{degree}</Text>
                    </ListItem>
                    {index < user.certifications.length - 1 && <ListItemDivider />}
                  </View>
                ))}
              </ListItemContainer>
            </Section>

            <Section
              icon="brief-case"
              header="PROFESSIONAL MEMBERSHIPS"
            >
              {user.proMemberships.length == 0 && (
                <SectionTextWrapper>
                  <Text style={styles.sectionText}>No professional memberships yet</Text>
                </SectionTextWrapper>
              )}
            </Section>
          </View>
        </ScrollView>

        <View
          style={{
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 20,
            paddingBottom: 20,
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
      </View>
    );
  }
}

const ListItemContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.View`
  padding: 25px;
`;

const ListItemDivider = styled.View`
  width: 100%;
  height: 1px;
  backgroundColor: #e0e0e0;
  marginLeft: 25px;
  marginRight: 25px;
`;

const SectionTextWrapper = styled.View`
  padding: 17px 25px;
`;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionText: {
    lineHeight: 25,
    fontSize: 14,
  },
});
