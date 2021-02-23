import express from 'express'
const router = express.Router()

import Connection from '../models/Connection'
import User from '../models/User'
import auth from '../middlewares/auth'

router.post('/connection/status', auth, (req: any, res) => {
  Connection.findOne({ $or: [
    { userOne: req.body.person, userTwo: req.user.id },
    { userOne: req.user.id, userTwo: req.body.person }
  ] }).then((connection: any) => {
    if (connection != null) {
      if (connection.status == 'pending') {
        if (connection.userOne == req.user.id) {
          // I sent
          res.json({
            status: 'waiting'
          })
        } else {
          // I received
          res.json({
            status: 'pending'
          })
        }
      } else {
        res.json({
          status: connection.status
        })
      }
    } else {
      res.json({
        status: null
      })
    }
  }).catch((err) => {
    res.status(500).json({
      message: 'error: ' + err
    })
  })
})

router.get('/connection/all', auth, (req: any, res) => {
  Connection.find({ $or: [
    { userOne: req.user.id },
    { userTwo: req.user.id }
  ] }).then((connections: any) => {
    User.find({}, 'displayName username _id photoUrl favProgLang bio location blog profileUrl').then((users) => {
      let connectionsArr = []
      for (let i = 0; i < connections.length; i++) {
        if (connections[i].userOne == req.user.id) {
          connectionsArr.push(connections[i].userTwo)
        } else {
          connectionsArr.push(connections[i].userOne)
        }
      }

      let friends = users.filter((user) => {
        for (var i = 0; i < connectionsArr.length; i++) {
          if (user._id.toString() == connectionsArr[i]) {
            return true
          }
        }
        return false
      })

      res.json({
        users: friends
      })
    })
  }).catch((err) => {
    console.log(err)
  })
})

router.post('/connection', auth, (req: any, res) => {
  const connection = new Connection({
    userOne: req.user.id,
    userTwo: req.body.person
  })

  connection.save((err, result) => {
    if (err) res.status(500).json({
      message: 'error: ' + err
    })

    res.json({
      message: 'connection request send.'
    })
  })
})

router.put('/connection', auth, (req: any, res) => {
  Connection.updateOne({ userOne: req.body.person, userTwo: req.user.id }, { status: 'connected' })
    .then(() => {
      res.json({
        message: 'connection request accepted'
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'error: ' + err
      })
    })
})

router.delete('/connection', auth, (req: any, res) => {
  Connection.deleteOne({ $or: [
    { userOne: req.body.person, userTwo: req.user.id },
    { userOne: req.user.id, userTwo: req.body.person }
  ] })
    .then(() => {
      res.json({
        message: 'connection deleted'
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'error: ' + err
      })
    })
})

export = router