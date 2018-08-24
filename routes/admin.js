var express = require('express');
var router = express.Router();

var adminconfig = require('../config/admin');

router.use(function (req, res, next) {
    console.log(req.session.admin);
    if (req.session.admin === undefined) {
        res.redirect('/auth/login');
    } else {
        next();
    }
})


router.get('/', function (req, res, next) {
    res.render('admin/index', {
        title: 'Express',
        page: 'index.ejs'
    });
});


module.exports = router;