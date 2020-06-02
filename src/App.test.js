import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import masterReducer from './modules';
import { userLogin } from './modules/user';

const store = createStore(masterReducer, composeWithDevTools());
function loadUser() {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    store.dispatch(userLogin(userId));
  } catch (e) {
    console.log('Local Storage Call Error');
  }
}

loadUser();

describe('구수한 그만의 테.스.트 코드', () => {
  it('메뉴 다 있냐', () => {
    const utils = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    utils.getByText('ESC');
    utils.getByText('Album');
    utils.getByText('Artist');
    utils.getByText('Track');
    utils.getByText('Log In');
  });
});
