const post_types = require('../../config/post_types');
const Post = require('../../models/posts_model');
const check = post_types.map(v => v.type);
const path = require('path');
const file_uploader = require('../../lib/file_uploader');
const gallery_model = require('../../models/gallery_model');
module.exports = function (router) {
    router.get('/gallery', async (req, res) => {
        var data = {

            load_page: 'gallery/index.ejs',
            gallery: await gallery_model.getGallery()

        }
        // return res.send(data);
        res.render('admin/index', data)
    })

    router.post('/gallery', async (req, res) => {
        try {
            var re = await file_uploader.upload_gallery(req.files.images, req);
            res.send(re);
        } catch (error) {
            res.send(error);
        }
    })

    return router;
}