import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, styled, Toolbar, AppBar, Box } from '@material-ui/core';
import { useAuth0 } from '../utils/auth0';

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

const StyledButton = styled(Button)({
  backgroundColor: '#474261',
  color: '#EEEEEE',
  fontFamily: 'Lato',
  fontSize: '1rem',
  '&:hover': {
    background: '#877FAD',
  },
});

const LogoutButton = styled(Button)({
  color: '#EEEEEE',
  fontWeight: 700,
  fontFamily: 'Lato',
  fontSize: '1.3rem',
  textTransform: 'none',
  paddingRight: '1rem',
});

const ActiveStyle = { color: '#FFFFFF' };
const LinkStyle = { textDecoration: 'none', color: 'inherit' };

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
      <AppBar>
        <HeaderBlock>
          <NavLink to="/" style={LinkStyle}>
            MusicPlayer.Cloud
          </NavLink>

          {isAuthenticated ? (
            <>
              <HeaderLinks flexGrow={1}>
                <LinkBox>
                  <NavLink
                    to="/artist"
                    activeStyle={ActiveStyle}
                    style={LinkStyle}
                  >
                    Artist
                  </NavLink>
                </LinkBox>
                <LinkBox>
                  <NavLink
                    to="/album"
                    activeStyle={ActiveStyle}
                    style={LinkStyle}
                  >
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
              <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
              <StyledButton>
                <NavLink to="/upload" style={LinkStyle}>
                  Upload
                </NavLink>
              </StyledButton>
            </>
          ) : (
            <>
              <HeaderLinks flexGrow={1} />
              <StyledButton onClick={() => loginWithRedirect()}>
                Log In
              </StyledButton>
            </>
          )}
        </HeaderBlock>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
