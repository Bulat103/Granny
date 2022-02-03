const express = require('express');

const router = express.Router();
// eslint-disable-next-line import/no-useless-path-segments
const { Admin, User } = require('../db/models');

//---------------------------------------------------
// http://localhost:3000/user/signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  if (req.body.ifGrandson) {
    const { ifGrandson, ...newAdmin } = req.body;
    await Admin.create(newAdmin);
  } else {
    await User.create(req.body);
  }
});

//---------------------------------------------------
// http://localhost:3000/user/signup
router.get('/signin', (req, res) => {
  res.render('signin');
});

module.exports = router;
