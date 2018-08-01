module.exports = {
  getGoals: (req, res) => {
    const db = req.app.get('db')
    const { social } = req.body
    db.get_facebook_goals()
      .then(userGoals => res.status(200).send(userGoals))
  }
}