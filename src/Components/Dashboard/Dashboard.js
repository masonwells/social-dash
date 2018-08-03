import React, { Component } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUserData } from '../../ducks/authZero'
import Nav from '../Nav/Nav'
import Card from '../Card/Card'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  componentDidMount() {
    axios.get('/api/user-data').then(res => {
      //invoke action creator to update redux state
      this.props.updateUserData(res.data)})
}






  render() {
    let {user} = this.props
    console.log(this.props.user)
    return (
      <div>
        <h1>Dashboard</h1>
        {
          user.user_name ? (
              <div>
                <Nav />
                <Card social='facebook' />
                <Card social='twitter' />
                <Card social='instagram' />
              </div>
          ) : <p>Please log in to view this page</p>
        }
      </div>
    )
  }
}




function mapStateToProps(state) {
  return {
    user: state.authZero.user
  }
}

export default connect(mapStateToProps, { updateUserData })(Dashboard)