const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');
const restricted = require('../Auth/restricted');

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  Users.findBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res
          .status(200)
          .json({ message: `Welcome ${user.username}! eat this cookie` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.get('/users', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: 'Error while logging out' })
      } else {
        res.status(200).json({ message: 'User logout successful' })
      }
    })
  } else {
    res.status(200).json({ message: 'User was never logged in' })
  }
})

module.exports = router;