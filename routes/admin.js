var express = require('express');
var router = express.Router();
var post_types = require('../config/post_types');
const gravatar = require('../lib/gravatar');

const newsletter_module = require('../models/newsletter_model');
const post_model = require('../models/posts_model');
const responses_model = require('../models/responses_model');

var adminconfig = require('../config/admin');

router.use(function (req, res, next) {
    
    if (req.session.admin === undefined) {
        req.flash('error_msg','Login First')
        res.redirect('/auth/login');
    } else {
        res.locals.gravatar_avatar = gravatar.getAvatar(req.session.admin.email)
        res.locals.session = req.session.admin;
        res.locals.post_types = post_types
        next();
    }
})


router.get('/', async function (req, res, next) {
    let data = {
        title: 'Express',
    };
    data.widgets = await Promise.all([
        newsletter_module.getSubsCount(),
        post_model.count_posts(),
        responses_model.count_submissions()
    ]);
    //return res.send(data);
    res.render('admin/index', data);
});


require('./admin_routes/cms')(router);
require('./admin_routes/admin_ajax')(router);
require('./admin_routes/gallery')(router);
require('./admin_routes/customization')(router);
require('./admin_routes/forms')(router);
require('./admin_routes/newsletter')(router);


module.exports = router;