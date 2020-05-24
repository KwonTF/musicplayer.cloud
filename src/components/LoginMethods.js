import React from 'react';
import GoogleLogin from 'react-google-login';

const LoginSuccess = (response) => {
  console.log(response);
};
const LoginFailure = (response) => {
  console.log('Failed');
  console.log(response);
};

const GOOGLE_CLIENT_ID =
  '413749160889-vk1ej3qhsgva4pin3cgvjkidnsni2297.apps.googleusercontent.com';

const LoginMethods = () => {
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="ESC with Google"
      onSuccess={LoginSuccess}
      onFailure={LoginFailure}
    />
  );
};

export default LoginMethods;
