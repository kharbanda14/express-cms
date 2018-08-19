var config = require('./config/site').config;
var path = require('path');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.locals.base_url = config.base_url;
        res.locals.meta = config.meta;
        res.locals.views = path.join(__dirname, 'views/')
        next();
    })
}