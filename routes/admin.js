var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/index', {
        title: 'Express',
        page: 'index.ejs'
    });
});

module.exports = router;