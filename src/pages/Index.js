import React from 'react';
import { Box, Typography, Button, styled } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { useAuth0 } from '../utils/auth0';

const Index = () => {
  const { loginWithRedirect } = useAuth0();
  const TitleTypography = styled(Typography)({
    fontSize: '6em',
    marginBottom: '0',
    fontWeight: '300',
    color: '#F26916',
  });
  const LogInButton = styled(Button)({
    background: 'linear-gradient(to right, #F22E62, #F26916)',
    '&hover': {
      background: 'linear-gradient(to right, #F24976, #F9663E)',
    },
  });
  return (
    <>
      <Helmet>
        <title>MusicPlayer.Cloud</title>
      </Helmet>
      <Box m={16} />
      <TitleTypography component="h2" variant="h2">
        MusicPlayer.Cloud
      </TitleTypography>
      <Typography variant="h4" color="textSecondary">
        Play your music, everywhere.
      </Typography>
      <Box m={8} />
      <LogInButton
        variant="contained"
        color="primary"
        onClick={() => loginWithRedirect()}
      >
        Login
      </LogInButton>
    </>
  );
};

export default Index;
