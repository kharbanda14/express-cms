var session = require('express-session');
var csurf = require('csurf');
var store = require('connect-mongo')(session);
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
    /**
     * CSRF middleware
     */
    app.use(csurf());
    
    return app;
}