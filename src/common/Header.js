import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, styled, Toolbar, AppBar, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const HeaderBlock = styled(Toolbar)({
  backgroundColor: '#56613d',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.5rem',
});
const HeaderArea = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
const HeaderLinks = styled(Box)({
  fontSize: '1.3rem',
  fontWight: 400,
  display: 'flex',
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
const Header = ({ location: { pathname } }) => {
  console.log(pathname);
  return (
    <>
      <AppBar>
        <HeaderBlock>
          <HeaderArea flexGrow={1}>
            <Link to="/">ESC</Link>
            <HeaderLinks>
              <LinkBox>
                <Link
                  to="/artist"
                  style={pathname === '/artist' ? {} : { color: '#BBBBBB' }}
                >
                  Artist
                </Link>
              </LinkBox>
              <LinkBox>
                <Link
                  to="/album"
                  style={pathname === '/album' ? {} : { color: '#BBBBBB' }}
                >
                  Album
                </Link>
              </LinkBox>
              <LinkBox>
                <Link
                  to="/playlist"
                  style={pathname === '/playlist' ? {} : { color: '#BBBBBB' }}
                >
                  Track
                </Link>
              </LinkBox>
            </HeaderLinks>
          </HeaderArea>
          <HeaderArea>
            <LoginButton>
              <Link to="/login">Log In</Link>
            </LoginButton>
          </HeaderArea>
        </HeaderBlock>
      </AppBar>
      <Toolbar />
    </>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default withRouter(Header);
