const post_types = require('../../config/post_types');
const Post = require('../../models/posts_model');
const check = post_types.map(v => v.type);
const path = require('path');

module.exports = function (router) {
    router.get('/cms/:post_type?/:action?/:id?', async function (req, res) {
        const {
            post_type,
            action,
            id
        } = req.params;
        if (check.indexOf(post_type) === -1) {
            return res.send('nope')
        }
        if (action == 'create') {
            var data = {
                post_type: post_types[check.indexOf(post_type)],
                load_page: 'post/index.ejs',
                form_err: req.flash('form_err')[0] || {},
                existing_data: req.flash('existing_data')[0] || {},
                success_msg: req.flash('success_msg'),
                form_err_msg: req.flash('form_err_msg'),
            }
            // return res.send(data);
            res.render('admin/post/index', data)
        } else if (action == 'edit' && id !== undefined) {
            var data = {
                post_type: post_types[check.indexOf(post_type)],
                load_page: 'post/index.ejs',
                form_err: req.flash('form_err')[0] || {},
                existing_data: req.flash('existing_data')[0] || await Post.getPostById(id),
                success_msg: req.flash('success_msg'),
                form_err_msg: req.flash('form_err_msg'),
            }
            //return res.send(data);
            res.render('admin/post/index', data)
        } else {
            var data = {
                post_type: post_types[check.indexOf(post_type)],
                posts: []
            }
            data.posts = await Post.get_all_posts({
                post_type: post_type
            });
            data.post_count = await Post.count_posts({
                post_type: post_type
            })
            //return res.send(data);
            res.render('admin/post/view_all.twig', data)
        }

    });
    router.post('/cms/:post_type/:action/:id?', async function (req, res) {
        const {
            post_type,
            action,
            id
        } = req.params;
        const post = req.body;
        //return res.send(post);
        if (check.indexOf(post_type) === -1) {
            return res.send('nope')
        }
        try {
            post.user_id = req.session.admin._id;
            post.post_type = post_type;
            let redirect_url;
            if (action == 'create') {
                let slug = Post.slugify(post.title);
                let exists = await Post.getPostBySlug(slug);
                post.slug = slug
                if (exists) {
                    post.slug = slug + '-' + Math.random().toString(32).substr(2, 5)
                }

                let newpost = await Post.create_post(post);
                redirect_url = path.dirname(req.originalUrl) + '/edit/' + newpost._id;
                req.flash('success_msg', 'Post Created!')
            }
            if (action == 'edit' && id != undefined) {
                post.last_edited = Date.now();
                await Post.edit_post(id, post);
                redirect_url = req.originalUrl;
                req.flash('success_msg', 'Post Edited!')
            }
            res.redirect(redirect_url);
        } catch (error) {
            //console.log(error)
            //res.send(error);
            req.flash('form_err', error.errors);
            req.flash('form_err_msg', error.message);
            req.flash('existing_data', req.body);
            res.redirect(req.originalUrl);
        }
    });

    return router;
}