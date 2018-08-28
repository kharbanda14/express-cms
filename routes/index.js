var express = require('express');
var router = express.Router();
const post_model = require('../models/posts_model');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layouts/default', {
    title: 'Express',
    page: 'index.ejs'
  });
});


router.get('/:slug', async (req, res, next) => {
  const {
    slug
  } = req.params;
  // look for posts!
  try {
    const post = await post_model.fetchSinglPost({
      slug: slug
    })
    if (post) {
      var load_data = {
        post: post,
        page: 'post'
      };
      if (post.post_type == 'post') {
        res.render('layouts/default', load_data)
      } else if (post.post_type == 'page') {
        load_data.page = 'page';
        res.render('layouts/default', load_data)

      } else {

      }
      //res.send(post)
    } else {
      return next();
    }
  } catch (error) {
    return next();
  }
})

module.exports = router;