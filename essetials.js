var config = require('./config/site').config;
var admin_config = require('./config/admin');
var path = require('path');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.locals.base_url = config.base_url;
        res.locals.meta = config.meta;
        res.locals.views = path.join(__dirname, 'views/');
        res.locals.admin_views = path.join(__dirname, 'views/admin/');
        res.locals.admin_partials = path.join(__dirname, 'views/admin/partials/');
        res.locals._csrf = req.csrfToken();
        res.locals._csrfInput = `<input type="hidden" name="_csrf" value="${req.csrfToken()}">`;
        res.locals.current_url = req.originalUrl;
        res.locals.admin_baseurl = admin_config.base_url
        next();
    })
}