import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';
import masterReducer from './modules';
import { userLogin, userLogout } from './modules/user';

const store = createStore(masterReducer, composeWithDevTools());
function loadUser() {
  try {
    const userId = localStorage.getItem('userId').slice(1, -1);
    if (!userId) return;
    store.dispatch(userLogin(userId));
  } catch (e) {
    console.log('Local Storage Call Error');
    store.dispatch(userLogout());
  }
}

loadUser();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
