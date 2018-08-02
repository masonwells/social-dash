module.exports = {
  getGoals: (req, res) => {
    const db = req.app.get('db')
    db.get_instagram_goals()
      .then(userGoals => res.status(200).send(userGoals))
  },
  updateGoals: (req, res) => {
    const db = req.app.get('db')
    const { likes, followers, posts, social, id } = req.body
    db.update_social_goals([likes, followers, posts, social, id])
      .then(userGoals => { res.status(200).send(userGoals) })
  }
}