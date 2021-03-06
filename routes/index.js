var express = require('express');
var router = express.Router();
const post_model = require('../models/posts_model');
const newsletter = require('../models/newsletter_model');

const notif = require('../lib/newsletter');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let data = {};
  data.posts = await post_model.getBlogPosts();
  //return res.send(data);
  res.render('index', data);
});

router.get('/test', async (req, res) => {
  let re = await notif.sendNewsletter();
  res.send(re);
})

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
        title: post.title,
        page: 'post'
      };
      //return res.send(post);
      if (post.post_type == 'post') {
        res.render('post', load_data)
      } else if (post.post_type == 'page') {
        load_data.page = 'page';
        res.render('page', load_data)

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


router.post('/newsletter/subscribe', async function (req, res) {
  let body = req.body;
  const {
    name,
    email
  } = body;
  try {
    let resp = await newsletter.subscribeUser(name, email);
    req.flash('success_msg', 'Subscribed!');
    res.redirect('/');
  } catch (error) {
    req.flash('error_msg', 'Subscribed!');
    res.redirect('/')
  }
  res.send(body);
})

module.exports = router;