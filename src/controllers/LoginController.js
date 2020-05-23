import React from 'react';
import LoginComponent from '../components/LoginComponent';

const LoginSuccess = (response) => {
  console.log(response);
};
const LoginFailure = (response) => {
  console.log('Failed');
  console.log(response.error);
};

const CLIENT_ID =
  '413749160889-mvn7kkimsgm8j081kfh633rhdfv4cacc.apps.googleusercontent.com';

const LoginController = () => {
  return (
    <LoginComponent
      clientId={CLIENT_ID}
      LoginFailure={LoginFailure}
      LoginSuccess={LoginSuccess}
    />
  );
};

export default LoginController;
