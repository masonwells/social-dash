import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUserData } from '../../ducks/authZero'
import {Link} from 'react-router-dom'

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
      this.props.updateUserData(res.data)
    })
  }

  logOut() {
    axios.get('/api/logout').then(res => {
      this.props.history.push('/')
    })
  }



  render() {
    console.log(this.props.user)
    let {user} = this.props
    return (
      <div>
        <h1>Account Information</h1>
    {
      user.user_name ? (
        <div>
          <Link to='/dashboard'><button>Return to Dash</button></Link>
          <h1>Account Name: {user.user_name}</h1>
          <h1>Email: {user.email}</h1>
          <img src={user.picture} alt=""/>
          <button onClick={()=>this.logOut()}>Log out</button>
        </div>
      ) : <p>Please Log in to view this page.</p>
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