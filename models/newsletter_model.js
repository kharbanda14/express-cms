const Newsletter = require('../collections/Newsletter')


exports.subscribeUser = async function (name, email) {
    let exists = await Newsletter.findOne({
        email: email
    })
    if (exists) {
        exists.is_subscribed = true;
        exists.updated_ad = Date.now();
        return exists.save();
    } else {
        let newsub = new Newsletter({
            email: email,
            name: name,
            is_subscribed: true
        }).save()

        return newsub;
    }
}

exports.getUsersList = async (query = {}, limit = 20, skip = 0) => {
    return Newsletter.find(query)
    .limit(limit)
    .skip(skip)
    .lean()
    .exec()
}
exports.getUser = async (id) => {
    return Newsletter.findById(id).lean().exec();
}

exports.deleteUser = async (id) => {
    return Newsletter.findByIdAndRemove(id).exec();
}

exports.getSubsCount = async (query = {}) => {
    return Newsletter.find(query).countDocuments();
}

exports.find = async (keyword) => {
    //return Newsletter.
}