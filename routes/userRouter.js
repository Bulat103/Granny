const express = require('express');
const sha256 = require('sha256');

const router = express.Router();
// eslint-disable-next-line import/no-useless-path-segments
const { Admin, User, Image } = require('../db/models');

//---------------------------------------------------
// http://localhost:3000/user/signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

//---------------------------------------------------
// http://localhost:3000/user/signup
router.post('/signup', async (req, res) => {
  console.log(req.body);
  // Если пользователь бабушка:
  if (req.body.checkRole === 'grandma') {
    const { checkRole, ...newGrandma } = req.body;
    console.log(newGrandma);
    // ищем внука в БД по майлу
    const grandson = await Admin.findOne({ where: { email: newGrandma.grandSon } });
    console.log('grandson------', grandson);
    // если внук есть то:
    if (grandson) {
      // создаем бабаку
      const newUser = await User.create(newGrandma);
      // пишем ее в сессию
      req.session.user = newUser.name;
      req.session.userid = newUser.id;
      req.session.userRole = newUser.checkRole;
      console.log('session-------', req.session);
      const grandmaId = await User.findAll();
      // в user_id внука пишем id бабки
      await Admin.update({ user_id: grandmaId.length }, {
        where: {
          email: grandson.email,
        },
      });
      console.log('id---------', grandmaId.length);
      res.redirect('/user/profile');
    }
  } else {
    const newUser = await Admin.create(req.body);
    req.session.user = newUser.name;
    req.session.userid = newUser.id;
    req.session.userRole = newUser.checkRole;
    console.log('session---------', req.session);
    res.redirect('/user/profile');
  }
});

//---------------------------------------------------
// http://localhost:3000/user/profile
router.get('/profile', async (req, res) => {
  let me;
  const photo = await Image.findAll();
  if (req.session.userRole === 'grandma') {
    me = await User.findByPk(req.session.userid);
   
    // console.log(me);
  } else {
    me = await Admin.findByPk(req.session.userid);
    
    // console.log(me);
  }

  // const newPhoto = photo.url;
  res.render('profile', { me, photo });
});

//---------------------------------------------------
// http://localhost:3000/user/signup
router.get('/signin', (req, res) => {
  res.render('signin');
});
router.post('/signin', async (req, res) => {
  const { email } = req.body;
  const user = await Admin.findOne({ where: { email } });
  if (user) {
    const secretPassword = sha256(user.password);
    if (secretPassword === sha256(req.body.password)) {
      console.log('111111');
      req.session.user = user.name;
      req.session.userid = user.id;
      res.redirect('/user/profile');
    } else {
      res.send(`invalid pass, valid is ${sha256(user.password)}`);
    }
  } else {
    res.send('Granny, go to sleep');
  }
});

module.exports = router;
