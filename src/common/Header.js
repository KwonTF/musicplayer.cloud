import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Responsive from './Responsive';

const HeaderBlock = styled(Responsive)`
  display: flex;
  position: absolute;
  height: 8%;
  width: 100vw;
  background-color: #56613d;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5rem;
`;
const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  .HeaderLinks {
    font-size: 1.3rem;
    font-weight: 400;
    a {
      margin-left: 10%;
    }
  }
`;

const LoginButton = withStyles({
  root: {
    background: '#474261',
    color: '#EEEEEE',
    fontFamily: 'Lato',
    fontSize: 16,
    '&:hover': {
      background: '#877FAD',
    },
  },
})(Button);

const Header = ({ location: { pathname } }) => {
  console.log(pathname);
  return (
    <HeaderBlock>
      <HeaderArea>
        <Link to="/">ESC</Link>
        <div className="HeaderLinks">
          <Link
            to="/artist"
            style={pathname === '/artist' ? {} : { color: '#BBBBBB' }}
          >
            Artist
          </Link>
          <Link
            to="/album"
            style={pathname === '/album' ? {} : { color: '#BBBBBB' }}
          >
            Album
          </Link>
          <Link
            to="/playlist"
            style={pathname === '/playlist' ? {} : { color: '#BBBBBB' }}
          >
            Track
          </Link>
        </div>
      </HeaderArea>
      <HeaderArea>
        <LoginButton>
          <Link to="/login">Log In</Link>
        </LoginButton>
      </HeaderArea>
    </HeaderBlock>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default withRouter(Header);
