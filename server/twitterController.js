module.exports = {
  getGoals: (req, res) => {
    const db = req.app.get('db')
    db.get_twitter_goals()
      .then(userGoals => res.status(200).send(userGoals))
  }

}