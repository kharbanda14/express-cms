const Post = require('../collections/Posts');
const marked = require('marked');


module.exports.create_post = function (body) {
    return new Post(body).save();
}

module.exports.edit_post = function (id, data) {
    return Post.findByIdAndUpdate(id, data)
}

module.exports.count_posts = function (query) {
    return Post.find(query).countDocuments()
}

module.exports.get_all_posts = function (query = {}, limit = 5, skip = 0) {
    return Post.find(query).limit(limit).skip(skip).populate({
        path: 'user_id',
        ref: 'users',
        select: 'first_name last_name username'
    }).lean().exec();
}

exports.getBlogPosts = (skip = 0) => {
    return Post.find({
        post_type: 'post'
    }).limit(5).skip(skip).sort({
        _id: 'asc'
    }).populate({
        path: 'featured_image',
        ref: 'gallery',
    }).lean().exec();
}

module.exports.getPostById = function (id) {
    return Post.findById(id).populate({
            path: 'user_id',
            ref: 'users',
            select: 'first_name last_name username'
        })
        .populate({
            path: 'featured_image',
            ref: 'gallery',
        })
        .lean().exec();
}

module.exports.getPostBySlug = (slug) => {
    return Post.findOne({
        slug: slug
    }).lean().exec();
}

module.exports.slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

module.exports.fetchSinglPost = (query = {}) => {
    return new Promise((resolve, reject) => {
        Post.findOne(query).populate({
                path: 'user_id',
                ref: 'users',
                select: 'first_name last_name username email'
            })
            .populate({
                path: 'featured_image',
                ref: 'gallery',
            })
            .lean().exec().then(
                (post) => {
                    if (post) {
                        marked.parse(post.content, (err, parsed) => {
                            if (err) return reject('error in converting string');
                            post.content_rendered = parsed
                            return resolve(post);
                        })
                    } else {
                        return reject('nothing found');
                    }
                })
            .catch(err => reject(err));

    });
}