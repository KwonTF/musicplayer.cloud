import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, styled, Toolbar, AppBar, Box } from '@material-ui/core';
import { useAuth0 } from '../utils/auth0';

const HeaderBlock = styled(Toolbar)({
  backgroundColor: '#F22E62',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.5rem',
});

const HeaderLinks = styled(Box)({
  fontSize: '1.3rem',
  fontWight: 400,
  display: 'flex',
  color: '#FFB3C7',
});

const LinkBox = styled(Box)({
  paddingLeft: '1rem',
});

const StyledButton = styled(Button)({
  backgroundColor: '#F26916',
  color: '#EEEEEE',
  fontFamily: 'Lato',
  fontSize: '1rem',
  '&:hover': {
    background: '#F9A50A',
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

const ActiveStyle = { color: '#FFE6EC' };
const LinkStyle = { textDecoration: 'none', color: 'inherit' };

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
      <AppBar>
        <HeaderBlock>
          <NavLink to={isAuthenticated ? '/artist' : '/'} style={LinkStyle}>
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
                    to="/track"
                    activeStyle={ActiveStyle}
                    style={LinkStyle}
                  >
                    Track
                  </NavLink>
                </LinkBox>
              </HeaderLinks>
              <LogoutButton
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </LogoutButton>
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
