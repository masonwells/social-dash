import React, { Component } from 'react'
import axios from 'axios'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      card: [],
      likes: 0,
      followers: 0,
      posts: 0
    }
  }


  componentDidMount() {
    const { social } = this.props
    const { id } = this.props
    axios.get(`/social/goals/${social}/${id}`).then(res => {
      this.setState({ card: res.data[0] })
    }
    )
  }
  componentDidUpdate(){
    const { social } = this.props
    const { id } = this.props
    axios.get(`/social/goals/${social}/${id}`).then(res => {
      this.setState({ card: res.data[0] })
    }
    )
  }

  handleLikesInput(value) {
    this.setState({
      likes: value
    })
  }
  handleFollowersInput(value) {
    this.setState({
      followers: value
    })
  }
  handlePostsInput(value) {
    this.setState({
      posts: value
    })
  }
//update
  editGoals() {
    const { social } = this.props
    const { id } = this.props
    axios.put(`/social/goals/${social}/${id}`, {
      likes: this.state.likes,
      followers: this.state.followers,
      posts: this.state.posts
    }).then(res =>{
      this.setState({
        likes: res.data.likes,
        followers: res.data.followrs,
        posts: res.data.posts
      })
    })
  }
//post
createGoals() {
  const { social } = this.props
  const { id } = this.props

  axios.post(`/social/goals/${social}/${id}`, {
    likes: this.state.likes,
    followers: this.state.followers,
    posts: this.state.posts
  }).then(res =>{
    this.setState({
      likes: res.data.likes,
      followers: res.data.followrs,
      posts: res.data.posts
    })
  })
}





  render() {
    return (
      <div>
        <h1>{this.props.social}</h1>
        {
          this.state.card ? (
            <div>
              <input onChange={(e) => { this.handleLikesInput(e.target.value) }} type="text" placeholder="Likes goals" />
              <p> likes: {this.state.card ? this.state.card.likes : null}</p>
              <input onChange={(e) => { this.handleFollowersInput(e.target.value) }} type="text" placeholder="Followers goals" />
              <p> followers: {this.state.card ? this.state.card.followers : null}</p>
              <input onChange={(e) => { this.handlePostsInput(e.target.value) }} type="text" placeholder="Posts goals" />
              <p> posts: {this.state.card ? this.state.card.posts : null}</p>
              <p>users id: {this.props.id}</p>
              <button onClick={() => { this.editGoals() }}>Edit goals</button>
              <button onClick={() => { this.createGoals() }}>Create goals</button>

            </div>
          ) : <p>No data found</p>
        }

      </div>
    )
  }
}
