/* eslint-disable */
require('dotenv').config();


import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import todoApp from './reducers'
import { Provider } from 'react-redux'

let store = createStore(todoApp)

/* eslint-enable */

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
