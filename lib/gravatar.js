/**
 * Uses third party api to get the profile info
 * Gravatar 
 */
const crypto = require('crypto');
const fetch = require('node-fetch');
const path = require("path");
const fs = require('fs');
exports.getAvatar = (email, size = 100) => {
    let hash = generateHash(email);
    let url = `https://en.gravatar.com/avatar/${hash}?s=${size}`;
    return url;
}

exports.getProfile = (email, format = 'json') => {
    let hash = generateHash(email);
    return `https://en.gravatar.com/${hash}.${format}`;
}


function generateHash(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

function setCache(url) {
    fetch(url)
        .then(res => {
            let dest = getCachePath(url);
            let out = fs.createWriteStream(dest);
            res.body.pipe(out)
        })
        .catch(e => {
            console.log(e)
        })
}

function getCache(url) {
    fs.exists(getCachePath(url), exists => {
        console.log(exists)
    })
}

function getCachePath(url) {
    return APP_DIR + '/cache/avatars/' + generateHash(path.basename(url)) + '.jpg';
}