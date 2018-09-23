var bcrypt = require('bcrypt-nodejs');



module.exports.hash = (text) => {
    return bcrypt.hashSync(text, bcrypt.genSaltSync(10))
}

/**
 * Exports 
 */
module.exports.hashAsync = function (text) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return reject(err);
            } else {
                bcrypt.hash(text, salt, null, (e, hash) => {
                    if (e) {
                        return reject(e);
                    } else {
                        return resolve(hash);
                    }
                })
            }
        })
    })
};


module.exports.matchPassword = (pass, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, hash, (err,result) => {
            if (err) {
                reject('Passwords do not match');
            } else {
                resolve(result);
            }
        })
    });

}