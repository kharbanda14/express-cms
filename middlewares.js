var session = require('express-session');
var csurf = require('csurf');
module.exports = function (app) {
    /** 
     * Express-session middleware
     */
    app.use(session({
        secret: 'secretkey',
        resave: false,
        saveUninitialized: false
    }));
    /**
     * CSRF middleware
     */
    app.use(csurf());
    
    return app;
}