import React from 'react';
import styled from 'styled-components';
import { Grid, Box, Typography } from '@material-ui/core';
import LoginController from '../controllers/LoginController';

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
        <LoginController />
      </LoginBox>
    </LoginGrid>
  );
};
export default Login;
