const express = require('express');
const bodyPaser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const facebookController = require('./facebookController')
const instagramController = require('./instagramController')
const twitterController = require('./twitterController')
require('dotenv').config();

const { SERVER_PORT, REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express();
app.use(bodyPaser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

//AUTH ZERO
app.get('/auth/callback', async (req, res) => {
  console.log('styialkdj')
  let payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `http://${req.headers.host}/auth/callback`
  }
  //use the code from auth0 to get a token
  let responseWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
  //use the access token to get user info for whoever just logged in
  console.log(responseWithToken.data.access_token)
  let responseWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`)
  req.session.user = responseWithUserData.data
  console.log(responseWithUserData.data)
  //db calls
  // put user data on req.session object
  const db = req.app.get('db')
  let { sub, email, name, picture } = responseWithUserData.data
  let foundUser = await db.find_user([sub])
  if (foundUser[0]) {
    // put on session
    req.session.user = foundUser[0];
    res.redirect('/#/dashboard')
  } else {
    //create user
    let createdUser = await db.create_user([name, email, sub, picture])
    //put on session
    req.session.user = createdUser[0]
    res.redirect('/#/dashboard')
  }
  //This next block of code will be for fetching the facebook, instagram and twitter shiz when the time comes
  // app.get('/api/user-data', (req, res) => {
  //   if (req.session.user) {
  //     res.status(200).send(req.session.user)
  //   } else {
  //     res.status(401).send('Nice try broooo')
  //   }
  // })
})
//Facebook EndPoints
const facebook = '/facebook/goals'
app.get(`${facebook}`, facebookController.getGoals)
app.put(`${facebook}/:id`, facebookController.updateGoals)
app.post(`${facebook}`, facebookController.createGoals)
// app.delete(`${facebook}`, facebookController.delete)

//Instagram EndPoints
const instagram = '/instagram/goals'
app.get(`${instagram}`, instagramController.getGoals)
// app.put(`${instagram}/:id`, instagramController.update)
// app.post(`${instagram}`, instagramController.create)
// app.delete(`${instagram}`, instagramController.delete)

//Twitter EndPoints
const twitter = '/twitter/goals'
app.get(`${twitter}`, twitterController.getGoals)
// app.put(`${twitter}`, twitterController.update)
// app.post(`${twitter}`, twitterController.create)
// app.delete(`${twitter}`, twitterController.delete)




app.get('/api/logout', (req, res) => {
  req.session.destroy()
  res.send()
})

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`)
})