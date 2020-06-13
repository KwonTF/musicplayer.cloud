import React from 'react';
import { Box, Typography, Button, styled } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Page404 = () => {
  const TitleTypography = styled(Typography)({
    fontSize: '6em',
    marginBottom: '0',
    fontWeight: '300',
    color: '#F26916',
    background: 'linear-gradient(to right, #F22E62, #F26916)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  });
  const RedirectButton = styled(Button)({
    background: 'linear-gradient(to right, #F22E62, #F26916)',
    '&hover': {
      background: 'linear-gradient(to right, #F24976, #F9663E)',
    },
  });
  return (
    <>
      <Helmet>
        <title>Page Not Found :: MusicPlayer.Cloud</title>
      </Helmet>
      <Box m={16} />
      <TitleTypography component="h1" variant="h1">
        Page not found
      </TitleTypography>
      <Typography variant="h4" noWrap>
        <span role="img" aria-label="thinking face">
          🤔 I think it&apos;s all your fault, Not mine. 🤔
        </span>
      </Typography>
      <Box m={8} />
      <RedirectButton variant="contained" color="primary">
        <Link to="/" style={{ color: '#EEEEEE', textDecoration: 'none' }}>
          Home
        </Link>
      </RedirectButton>
    </>
  );
};

export default Page404;
