import React from 'react';
import LoginComponent from '../components/LoginComponent';

const LoginSuccess = (response) => {
  console.log(response);
};
const LoginFailure = (response) => {
  console.log('Failed');
  console.log(response);
};

const CLIENT_ID =
  '413749160889-vk1ej3qhsgva4pin3cgvjkidnsni2297.apps.googleusercontent.com';

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
