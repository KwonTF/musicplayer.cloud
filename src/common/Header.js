import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
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
const HeaderLeftArea = styled.div`
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
const HeaderRightArea = styled.div``;

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

const Header = () => (
  <HeaderBlock>
    <HeaderLeftArea>
      <Link to="/">ESC</Link>
      <div className="HeaderLinks">
        <Link to="/artist">Artist</Link>
        <Link to="/album">Album</Link>
        <Link to="/playlist">Track</Link>
      </div>
    </HeaderLeftArea>
    <HeaderRightArea>
      <LoginButton>
        <Link to="/login">Log In</Link>
      </LoginButton>
    </HeaderRightArea>
  </HeaderBlock>
);

export default Header;
