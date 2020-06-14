import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled, Toolbar, AppBar } from '@material-ui/core';
import { useAuth0 } from '../utils/auth0';

const HeaderBlock = styled(Toolbar)({
  backgroundColor: '#F22E62',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.5rem',
});

const LinkStyle = { textDecoration: 'none', color: 'inherit' };

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <AppBar>
        <HeaderBlock>
          <NavLink to={isAuthenticated ? '/artist' : '/'} style={LinkStyle}>
            MusicPlayer.Cloud
          </NavLink>
        </HeaderBlock>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
