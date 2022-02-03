const express = require('express');
const sha256 = require('sha256');

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
router.post('/signin',async (req, res) => {
  const{ email } = req.body;
  const user = await User.findOne


})
module.exports = router;
