var session = require('express-session');
var csurf = require('csurf');
var store = require('connect-mongo')(session);
var flash = require('connect-flash');
var upload = require('express-fileupload')

module.exports = function (app,connection) {
    /** 
     * Express-session middleware
     */
    app.use(session({
        secret: 'secretkey',
        resave: false,
        saveUninitialized: false,
        store:new store({
            mongooseConnection:connection
        })
    }));
    app.use(upload())
    /**
     * CSRF middleware
     */
    app.use(csurf());

    app.use(flash());

    
    return app;
}