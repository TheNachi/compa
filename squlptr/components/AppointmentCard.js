import React from 'react';
import styled, { css } from 'styled-components';
import Colors from '../constants/Colors';

const AppointmentCard = ({ status }) => (
  <AppointmentCardStyle status={status}>
    <AppointmentCardHeaderWrap status={status}>
      <AppointmentCardHeaderDetail
        status={status}
        style={{ borderRightWidth: 1 }}
      >
        <DetailHeader>Date</DetailHeader>
        <DetailBody>Oct 2, 1980</DetailBody>
      </AppointmentCardHeaderDetail>
      <AppointmentCardHeaderDetail>
        <DetailHeader>Time</DetailHeader>
        <DetailBody>12:20 PM</DetailBody>
      </AppointmentCardHeaderDetail>
    </AppointmentCardHeaderWrap>
    <AppointmentCardBody>
      <AppointmentCardBodyHeader>Note</AppointmentCardBodyHeader>
      <AppointmentCardBodyText>
        Some sample text content here to show that notes can be added to the
        appointment
      </AppointmentCardBodyText>
    </AppointmentCardBody>
  </AppointmentCardStyle>
);

const AppointmentCardStyle = styled.View`
  /* background-color: #27ae60; */
  border-radius: 12px;
  overflow: hidden;
  ${props =>
    props.status == 'Pending' &&
    css`
      background: #f67e00;
    `}

  ${props =>
    props.status == 'Approved' &&
    css`
      background: #27ae60;
    `}
`;

const AppointmentCardHeaderWrap = styled.View`
  flex-direction: row;
  ${props =>
    props.status == 'Pending' &&
    css`
      background: #fdae5b;
    `}

  ${props =>
    props.status == 'Approved' &&
    css`
      background-color: #6fcf97;
    `}
`;

const AppointmentCardHeaderDetail = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px 0;
  ${props =>
    props.status == 'Pending' &&
    css`
      border-right-color: #f67e00;
    `}

  ${props =>
    props.status == 'Approved' &&
    css`
      border-right-color: #219653;
    `}
`;

const DetailHeader = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.white};
`;

const DetailBody = styled.Text`
  font-size: 14px;
  line-height: 17px;
  color: ${Colors.white};
`;

const AppointmentCardBody = styled.View`
  padding: 15px 25px;
`;

const AppointmentCardBodyHeader = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 25px;
  color: ${Colors.white};
`;

const AppointmentCardBodyText = styled.Text`
  font-size: 14px;
  line-height: 17px;
  color: ${Colors.white};
`;

export default AppointmentCard;
