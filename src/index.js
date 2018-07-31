import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter, Link} from 'react-router-dom'
import {unregister} from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter> 
, document.getElementById('root'));
unregister()
