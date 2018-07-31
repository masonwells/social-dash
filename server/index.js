const express = require('express');
const bodyPaser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
require('dotenv').config();


const { SERVER_PORT, REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express();
app.use(bodyPaser.json());
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)



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
  res.redirect('/#/dashboard')

  //db calls
  // put user data on req.session object
  // req.session.user = responseFromDb
  // req.session = {user:{}}
  // const db = req.app.get('db')
  // let { sub, email, name, picture } = resWithUserData.data

  // let foundUser = await db.find_user([sub])
  // if (foundUser[0]) {
  //   // put on session
  //   req.session.user = foundUser[0];
  //   res.redirect('/#/dashboard')
  //   //slash above is "http://localhost:3000/"
  // } else {
  //   //create user
  //   let createdUser = await db.create_user([name, email, sub, picture])
  //   //put on session
  //   req.session.user = createdUser[0]
  //   res.redirect('/#/dashboard')
  // }




  //This next block of code will be for fetching the facebook, instagram and twitter shiz when the time comes
  // app.get('/api/user-data', (req, res) => {
  //   if (req.session.user) {
  //     res.status(200).send(req.session.user)
  //   } else {
  //     res.status(401).send('Nice try broooo')
  //   }
  // })
})


app.get('/api/logout', (req, res) => {
  req.session.destroy()
  res.send()
})

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`)
})