import React, {Component} from 'react'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      input: ''
    }
  }


  render(){
    return(
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default Dashboard