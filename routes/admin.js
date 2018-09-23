var express = require('express');
var router = express.Router();
var post_types = require('../config/post_types');

var adminconfig = require('../config/admin');

router.use(function (req, res, next) {
    
    if (req.session.admin === undefined) {
        req.flash('error_msg','Login First')
        res.redirect('/auth/login');
    } else {
        res.locals.post_types = post_types
        next();
    }
})


router.get('/', function (req, res, next) {
    res.render('admin/index', {
        title: 'Express',
    });
});


require('./admin_routes/cms')(router);
require('./admin_routes/admin_ajax')(router);
require('./admin_routes/gallery')(router);
require('./admin_routes/customization')(router);


module.exports = router;