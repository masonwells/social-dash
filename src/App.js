import React, { Component } from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import route from './routes'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        {route}
      </div>
    );
  }
}

export default App;
