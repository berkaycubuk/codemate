require('dotenv').config()
import express from 'express'
import request from 'superagent'
import mongoose from 'mongoose'

import User from './models/User'

const app = express()
const PORT = process.env.PORT || 8000

// Database connection
const DB_URL = process.env.MONGO_DB_URL || ''

mongoose.connect(DB_URL, { 
  useNewUrlParser: true 
})
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log(error))

// Middlewares
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello!')
})

const getGithubProfile = async (accessToken) => {
  await request
    .get('https://api.github.com/user')
    .set('User-Agent', 'request')
    .set('Authorization', `token ${accessToken}`)
    .then((response) => {
      console.log(response.body)
      return response.body;
    }).catch((error) => {
      console.log(error)
      return null
    })
}

const registerUser = (user: any, accessToken: String) => {
  const newUser = new User({
    githubId: user.id,
    githubAccessToken: accessToken,
    profileUrl: user.html_url,
    photoUrl: user.avatar_url,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  newUser.save((err) => {
    if (err) {
      console.log(err)
      return null
    }

    return newUser
  })
}

app.get('/auth/github/callback', (req, res) => {
  const code = req.query.code

  if (!code) {
    return res.send({
      success: false,
      message: 'Error: no code'
    })
  }

  let accessToken = ''

  // Post request to get access_token
  request
    .post('https://github.com/login/oauth/access_token')
    .send({ 
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    })
    .set('Accept', 'application/json')
    .then((response) => {
      console.log(response.body)
      accessToken = response.body.access_token

      // Get user
      request
        .get('https://api.github.com/user')
        .set('User-Agent', 'request')
        .set('Authorization', 'token ' + accessToken)
        .then((response) => {
          console.log(response.body)
          let user = {
            githubId: response.body.id,
            username: response.body.login,
            displayName: response.body.name,
            githubAccessToken: accessToken,
            bio: response.body.bio,
            location: response.body.location,
            profileUrl: response.body.html_url,
            photoUrl: response.body.avatar_url
          }

          User.find({ githubId: user.githubId }, (err, docs) => {
            if (err) console.log(err)
            if (docs.length) {
              // res.send(docs)
              res.redirect('http://localhost:5000')
            }
            let newUser = new User(user)

            newUser.save((err, result) => {
              if (err) { 
                console.log(err)
                // res.status(500).send('Error: User cannot registered')
              }
              // res.send(result)
              res.redirect('http://localhost:5000/register')
            })
          })
        }).catch((error) => {
          console.log(error)
        })
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})