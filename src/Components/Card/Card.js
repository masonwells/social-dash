import React, { Component } from 'react'
import axios from 'axios'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      card: []
    }
  }


  componentDidMount() {
    const { social } = this.props
    const { id } = this.props
    axios.get(`/social/goals/${social}/${id}`).then(res => {
      this.setState({ card: res.data[0] })
      console.log(`${social}`, res.data[0])
    }

    )
  }



  render() {
    return (
      <div>
        <h1>{this.props.social}</h1>
        {
          this.state.card ? (
            <div>
              <p> likes: {this.state.card ? this.state.card.likes : null}</p>
              <p> followers: {this.state.card ? this.state.card.followers : null}</p>
              <p> posts: {this.state.card ? this.state.card.posts : null}</p>
              <p>{this.props.id}</p>
            </div>
          ) : <p>No data found</p>
        }

      </div>
    )
  }
}
