import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter, Link} from '../node_modules/react-router-dom'
import {unregister} from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter> 
, document.getElementById('root'));
unregister()
