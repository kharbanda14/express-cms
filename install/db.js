var user_model = require('../models/users_model');
module.exports.createAdmin = (data) => {
    return user_model.createUser(data);
}