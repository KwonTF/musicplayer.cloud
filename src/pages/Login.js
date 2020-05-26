import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { initialUser, userLogin } from '../modules/user';

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

const GOOGLE_CLIENT_ID =
  '413749160889-vk1ej3qhsgva4pin3cgvjkidnsni2297.apps.googleusercontent.com';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ user }) => ({ userId: user.user }));
  const LoginSuccess = (response) => {
    dispatch(userLogin(response.getAuthResponse().id_token));
  };

  const LoginFailure = (response) => {
    console.log('Failed');
    console.log(response);
  };

  useEffect(() => {
    if (userId) {
      history.push('/');
      try {
        localStorage.setItem('userId', JSON.stringify(userId));
      } catch (e) {
        console.log('Local Storage Error.');
      }
    } else {
      dispatch(initialUser());
    }
  }, [dispatch, history, userId]);

  return (
    <LoginGrid>
      <LoginBox boxShadow={2}>
        <LoginHeader>ESC</LoginHeader>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="ESC with Google"
          onSuccess={LoginSuccess}
          onFailure={LoginFailure}
        />
      </LoginBox>
    </LoginGrid>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
