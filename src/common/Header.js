import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
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

const Header = () => {
  return (
    <>
      <AppBar>
        <HeaderBlock>
          <NavLink to="/">ESC</NavLink>
          <HeaderLinks flexGrow={1}>
            <LinkBox>
              <NavLink to="/artist" activeStyle={ActiveStyle}>
                Artist
              </NavLink>
            </LinkBox>
            <LinkBox>
              <NavLink to="/album" activeStyle={ActiveStyle}>
                Album
              </NavLink>
            </LinkBox>
            <LinkBox>
              <NavLink to="/playlist" activeStyle={ActiveStyle}>
                Track
              </NavLink>
            </LinkBox>
          </HeaderLinks>
          <LoginButton>
            <Link to="/login">Log In</Link>
          </LoginButton>
        </HeaderBlock>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default withRouter(Header);
