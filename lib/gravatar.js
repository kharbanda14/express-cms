/**
 * Uses third party api to get the profile info
 * Gravatar 
 */
const crypto = require('crypto');

exports.getAvatar = (email, size = 100) => {
    let hash = generateHash(email);
    return `https://en.gravatar.com/avatar/${hash}?s=${size}`;
}

exports.getProfile = (email, format = 'json') => {
    let hash = generateHash(email);
    return `https://en.gravatar.com/${hash}.${format}`;
}


function generateHash(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}