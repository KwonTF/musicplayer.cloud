import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useAuth0 } from '../utils/auth0';

const IndexRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated } = useAuth0();

  if (loading)
    return <Route path={path} render={<LinearProgress />} {...rest} />;

  const render = (props) =>
    isAuthenticated === true ? (
      <Redirect to="/artist" />
    ) : (
      <Component {...props} />
    );

  return <Route path={path} render={render} {...rest} />;
};

IndexRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default IndexRoute;
