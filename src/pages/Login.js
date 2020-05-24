import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import LoginMethods from '../components/LoginMethods';

const LoginGrid = styled(Grid)({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#BBBBBB',
});

const LoginBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#FEFEFE',
});

const LoginHeader = styled(Typography)({
  color: '#111111',
  fontWeight: 700,
  fontSize: '2rem',
  letterSpacing: '2px',
});

const Login = () => {
  return (
    <LoginGrid>
      <LoginBox boxShadow={2}>
        <LoginHeader>ESC</LoginHeader>
        <LoginMethods />
      </LoginBox>
    </LoginGrid>
  );
};
export default Login;
