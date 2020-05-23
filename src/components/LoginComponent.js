import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const LoginComponentBlock = styled(Box)({});

const LoginComponent = ({ clientId, LoginSuccess, LoginFailure }) => {
  return (
    <LoginComponentBlock>
      <GoogleLogin
        clientId={clientId}
        buttonText="ESC with Google"
        onSuccess={LoginSuccess}
        onFailure={LoginFailure}
      />
    </LoginComponentBlock>
  );
};

LoginComponent.propTypes = {
  clientId: PropTypes.string.isRequired,
  LoginSuccess: PropTypes.func.isRequired,
  LoginFailure: PropTypes.func.isRequired,
};

export default LoginComponent;
