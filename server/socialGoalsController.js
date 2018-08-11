module.exports = {
  getGoals: (req, res) => {
    const db = req.app.get('db')
    let { social, id } = req.params
    db.get_social_goals([social, id])
      .then(userGoals => res.status(200).send(userGoals))
  },
  updateGoals: (req, res) => {
    const db = req.app.get('db')
    const { likes, followers, posts } = req.body
    const { id, social } = req.params
    db.update_social_goals([likes, followers, posts, social, id])
      .then(goals => {
        console.log(goals)
        res.status(200).send(goals)
      })

  },
  createGoals: (req, res) => {
    const db = req.app.get('db')
    const { likes, followers, posts } = req.body
    const { id, social } = req.params
    db.create_social_goals([likes, followers, posts, id, social])
      .then(createdGoals => res.status(200).send(createdGoals))
  },
  delete: (req, res) => {
    const db = req.app.get('db')
    const { id, social } = req.params
    db.delete_goals([id, social])
      .then(deleted => { res.status(200).send() })
  }
}