/**
 * This includes all the vendor static files css,js files served using express static.
 */

var path = require('path');

module.exports = function (app, express) {
    
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
    app.use('/vendor/popper.js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
    app.use('/vendor/bootstrap',express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
    app.use('/admin_assets', express.static(path.join(__dirname, 'admin_assets')));

}