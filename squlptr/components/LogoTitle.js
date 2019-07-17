import React from 'react';
import styled from 'styled-components';

const LogoTitle = () => (
  <Logo
    style={{ resizeMode: 'contain' }}
    source={require('../assets/images/logo-white.png')}
    resizeMode="contain"
  />
);

const Logo = styled.Image`
  height: 23px;
  width: 77px;
`;

export default LogoTitle;
