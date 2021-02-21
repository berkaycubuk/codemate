require('dotenv').config()
import express from 'express'
import request from 'superagent'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import auth from './middlewares/auth'

import User from './models/User'

import { UserInfo } from './types'

const app = express()
const PORT = process.env.PORT || 8000

const jwt_expire = 3600 * 24

// Database connection
const DB_URL = process.env.MONGO_DB_URL || ''

mongoose.connect(DB_URL, { 
  useNewUrlParser: true 
})
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log(error))

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/user', auth, (req: any, res) => {
   User.findById(req.user.id)
    .then(user => res.json(user))
})

app.put('/user', auth, (req: any, res) => {
  req.body.updatedAt = new Date()

  User.updateOne({ _id: req.user.id }, req.body)
    .then(() => {
      res.json({
        message: 'profile updated.',
        user: req.body
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'something is wrong.'
      })
    })
})

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
            blog: response.body.blog,
            profileUrl: response.body.html_url,
            photoUrl: response.body.avatar_url,
            createdAt: new Date(),
            updatedAt: new Date()
          }

          User.find({ githubId: user.githubId }, (err, docs: UserInfo[]) => {
            if (err) console.log(err)
            if (docs.length) {
              console.log(docs)
              jwt.sign(
                { id: docs[0]._id },
                process.env.JWT_SECRET,
                { expiresIn: jwt_expire },
                (err, token) => {
                  if (err) throw err
                  res.redirect('http://localhost:3000/register?code=' + token)
                }
              )
            } else {
              let newUser = new User(user)

              newUser.save((err, result) => {
                if (err) { 
                  console.log(err)
                  // res.status(500).send('Error: User cannot registered')
                }
  
                jwt.sign(
                  { id: result._id },
                  process.env.JWT_SECRET,
                  { expiresIn: jwt_expire },
                  (err, token) => {
                    if (err) throw err
                    res.redirect('http://localhost:3000/register?code=' + token)
                  }
                )
              })
            }
          })
        }).catch((error) => {
          console.log(error)
        })
    })
})

app.get('/people', auth, (req, res) => {
  User.find({}, '_id username displayName favProgLang photoUrl').then((users) => {
    res.json(users)
  })
})

app.get('/user/:username', auth, (req, res) => {
  User.findOne({ username: req.params.username }).then((user) => {
    res.json(user)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})