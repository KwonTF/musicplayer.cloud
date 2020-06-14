import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AlbumIcon from '@material-ui/icons/Album';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '../utils/auth0';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: `0px -2.76px 2.21px 0px rgba(0, 0, 0, 0.02), 0px -6.65px 5.32px 0px rgba(0, 0, 0, 0.027), 0px -12.52px 10.0px 0px rgba(0, 0, 0, 0.035), 0px -22.33px 17.86px 0px rgba(0, 0, 0, 0.043), 0px -41.77px 33.42px 0px rgba(0, 0, 0, 0.05), 0px -100px 80px 0px rgba(0, 0, 0, 0.07)`,
  },
  fab: {
    position: 'fixed',
    bottom: '64px',
    right: '8px',
    background: 'linear-gradient(to right, #F22E62, #F26916)',
  },
  fabFloat: {
    position: 'fixed',
    bottom: '128px',
    right: '8px',
    background: 'linear-gradient(to right, #F22E62, #F26916)',
  },
});

export default function Footer() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const path = pathname.split('/')[1];
  const { nowPlaying } = useSelector(({ player }) => ({
    nowPlaying: player.nowPlaying,
  }));

  return isAuthenticated ? (
    <>
      <BottomNavigation showLabels value={path} className={classes.root}>
        <BottomNavigationAction
          component={Link}
          to="/artist"
          label="Artist"
          value="artist"
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/album"
          label="Album"
          value="album"
          icon={<AlbumIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/track"
          label="Track"
          value="track"
          icon={<MusicNoteIcon />}
        />
        <BottomNavigationAction
          label="Logout"
          onClick={() => logout({ returnTo: window.location.origin })}
          icon={<LockIcon />}
        />
      </BottomNavigation>
      <Fab
        color="primary"
        aria-label="add"
        className={nowPlaying ? classes.fabFloat : classes.fab}
        component={Link}
        to="/upload"
      >
        <CloudUploadIcon />
      </Fab>
    </>
  ) : (
    <BottomNavigation showLabels value={path} className={classes.root}>
      <BottomNavigationAction
        label="Login"
        onClick={() => loginWithRedirect()}
        icon={<LockOpenIcon />}
      />
    </BottomNavigation>
  );
}
