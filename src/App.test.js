import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import masterReducer from './utils';
import { Auth0Provider } from './utils/auth0';
import history from './utils/history';

const store = createStore(masterReducer, composeWithDevTools());
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

describe('구수한 그만의 테.스.트 코드', () => {
  it('메뉴 다 있냐', () => {
    const utils = render(
      <Auth0Provider
        domain="https://niceb5y.auth0.com/"
        client_id="Mxc9wJ3me4RNocER4EuAjjJeptBnMtWH"
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>,
    );
    utils.getByText('ESC');
    utils.getByText('Album');
    utils.getByText('Artist');
    utils.getByText('Track');
    utils.getByText('Log In');
  });
});
