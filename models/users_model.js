var User = require('../collections/Users');
var hasher = require('../lib/hash');
module.exports.createUser = function (data) {
    data.role = 'admin';
    return new User(data).save()
}

module.exports.authenticateAdmin = function (username, password) {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                username: username,
            }).lean().exec();
            var matched = await hasher.matchPassword(password, user.password);
            if (matched) {
                delete user.password;
                resolve(user);
            } else {
                reject('Username or password is incorrect');
            }
        } catch (error) {
            reject('Error Occured, Try Again');
        }
    });

}

exports.getUsers = () => {
    return User.find().lean().exec();
}