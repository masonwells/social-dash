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
    axios.get(`/social/goals/${social}`).then(res => {
      this.setState({ card: res.data[0] })
      console.log(res.data)
    }

    )
  }



  render() {
    return (
      <div>
        <h1>Card</h1>
        <h1>facebook likes: {this.state.card ? this.state.card.likes : null}</h1>
      </div>
    )
  }
}
