const Post = require('../collections/Posts');

module.exports.create_post = function (body) {
    return new Post(body).save();
}

module.exports.edit_post = function (id,data) {
    return Post.findByIdAndUpdate(id,data)
}

module.exports.count_posts = function (query) {
    return Post.find(query).countDocuments()
}

module.exports.get_all_posts = function (query = {},limit = 10, skip = 0) {
    return Post.find(query).limit(limit).skip(skip).populate({
        path: 'user_id',
        ref: 'users',
        select:'first_name last_name username'
    }).lean().exec();
}

module.exports.getPostById = function (id) {
    return Post.findById(id).lean().exec();
}