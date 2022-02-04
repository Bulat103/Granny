const express = require('express');
const got = require('got');
const { Image } = require('../db/models');

const router = express.Router();

function imageParser(arr) {
  let text = '';
  for (let i = 0; i < 6; i += 1) {
    text += `${arr[i].tag.en}, `;
  }
  return text;
}

router.post('/reader', async (req, res) => {
  const { url } = req.body;
  console.log(url);
  const apiKey = 'acc_6f3236ea8d2237f';
  const apiSecret = 'a4291e3c75f35c44c66c7807562eccec';
  const imageUrl = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(url)}`;
  (async () => {
    try {
      const id = req.session.userid;
      const response = await got(imageUrl, { username: apiKey, password: apiSecret });
      const body = JSON.parse(response.body);
      const description = imageParser(body.result.tags);
      await Image.create({ url, body: description, user_id: id });
      req.session.url = url;
      req.session.description = description;
      res.redirect('/user/profile');
    } catch (error) {
      console.log(error.response);
    }
  })();
});

module.exports = router;
