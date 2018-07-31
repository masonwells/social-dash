import React, { Component } from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import Routes from './routes'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
        {Routes}
      </div>
    );
  }
}

export default App;
