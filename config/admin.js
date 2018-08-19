/**
 * Contains Admin Configuration
 */
var site = require('./site').config;

/**
 * The path you want to access admin path. could be anything!
 */

var admin_path = 'admin'
module.exports = {
    path: `/${admin_path}`,
    base_url: `${site.base_url + admin_path}`,
}