import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, styled, Toolbar, AppBar, Box } from '@material-ui/core';

const HeaderBlock = styled(Toolbar)({
  backgroundColor: '#56613d',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.5rem',
});

const HeaderLinks = styled(Box)({
  fontSize: '1.3rem',
  fontWight: 400,
  display: 'flex',
  color: '#bbbbbb',
});

const LinkBox = styled(Box)({
  paddingLeft: '1rem',
});

const LoginButton = styled(Button)({
  backgroundColor: '#474261',
  color: '#EEEEEE',
  fontFamily: 'Lato',
  fontSize: 16,
  '&:hover': {
    background: '#877FAD',
  },
});

const ActiveStyle = { color: '#FFFFFF' };
const LinkStyle = { textDecoration: 'none', color: 'inherit' };

const Header = () => {
  return (
    <>
      <AppBar>
        <HeaderBlock>
          <NavLink to="/" style={LinkStyle}>
            ESC
          </NavLink>
          <HeaderLinks flexGrow={1}>
            <LinkBox>
              <NavLink to="/artist" activeStyle={ActiveStyle} style={LinkStyle}>
                Artist
              </NavLink>
            </LinkBox>
            <LinkBox>
              <NavLink to="/album" activeStyle={ActiveStyle} style={LinkStyle}>
                Album
              </NavLink>
            </LinkBox>
            <LinkBox>
              <NavLink
                to="/playlist"
                activeStyle={ActiveStyle}
                style={LinkStyle}
              >
                Track
              </NavLink>
            </LinkBox>
          </HeaderLinks>
          <LoginButton>
            <NavLink to="/login" style={LinkStyle}>
              Log In
            </NavLink>
          </LoginButton>
        </HeaderBlock>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
