var express = require('express');
var router = express.Router();
var users_model = require('../models/users_model');
var User = require('../collections/Users');
var adminconfig = require('../config/admin');
/* GET home page. */
router.post('/login', async function (req, res, next) {
    console.log(req.session.user);
    
    let {
        username,
        password
    } = req.body;

    try {
        var doc = await users_model.authenticateAdmin(username, password);
        req.session.admin = doc;
        res.redirect(`${adminconfig.path}`);
    } catch (error) {
        req.flash('error_msg',error);
        res.redirect('/auth/login');
    }
});

router.get('/check',function (req,res){
    console.log(req.session.admin)
    res.send(req.session.admin)
})

router.get('/logout', function (req, res) {
    req.session.admin = undefined;
    res.redirect('/')
})

router.get('/login', function (req, res, next) {
    if (req.session.admin !== undefined) {
        return res.redirect('/');
    }
    res.render('admin/login', {
        title: 'Express',
        error_msg:req.flash('error_msg')
    });
});

module.exports = router;