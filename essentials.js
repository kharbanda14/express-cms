var config = require('./config/site').config;
var admin_config = require('./config/admin');
var path = require('path');
var menuModel = require('./models/menu_model');
var queryLib = require('./lib/query');

module.exports = function (app) {
    app.use(async function (req, res, next) {
        res.locals.base_url = config.base_url;
        res.locals.meta = config.meta;
        res.locals.views = path.join(__dirname, 'views/');
        res.locals.admin_views = path.join(__dirname, 'views/admin/');
        res.locals.admin_partials = path.join(__dirname, 'views/admin/partials/');
        res.locals._csrf = req.csrfToken();
        res.locals._csrfInput = `<input type="hidden" name="_csrf" value="${req.csrfToken()}">`;
        res.locals.current_url = req.originalUrl;
        res.locals.admin_baseurl = admin_config.base_url;
        res.locals.moment = require('moment');
        res.locals.json_encode = (obj) => JSON.stringify(obj);
        res.locals.debug = (obj) => console.log(obj);
        res.locals.nav_menu = await menuModel.get_menu();
        res.locals.getQueryString = queryLib.generateQueryUrl(req.originalUrl);
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.searchParam = function (key, value) {
            let pObj = new URLSearchParams(req.query);
            if (pObj.has(key)) {
                pObj.set(key, value);
            } else {
                pObj.append(key, value)
            }
            return pObj.toString();
        }
        next();
    })
}