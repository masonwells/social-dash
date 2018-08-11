import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './ducks/store'
import {unregister} from './registerServiceWorker';


import './styles/index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();





ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter> 
</Provider>

, document.getElementById('root'));
unregister()
