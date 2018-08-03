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

componentDidUpdate() {
  axios.get('/api/user-data').then(res => {
    //invoke action creator to update redux state
    this.props.updateUserData(res.data)})
}




  render() {
    let {user} = this.props
    return (
      <div>
        <h1>Dashboard</h1>
        {
          user.user_name ? (
              <div>
                <Nav />
                <Card social='facebook'
                      id = {user.id} />
                <Card social='twitter'
                      id = {user.id} />
                <Card social='instagram'
                      id = {user.id} />
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