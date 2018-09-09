const post_types = require('../../config/post_types');
const Post = require('../../models/posts_model');
const check = post_types.map(v => v.type);
const path = require('path');
const file_uploader = require('../../lib/file_uploader');
const gallery_model = require('../../models/gallery_model');
module.exports = function (router) {
    router.get('/gallery/:format?', async (req, res) => {
        var data = {
            gallery: await gallery_model.getGallery()
        }
        if (req.params.format == 'json') {
            return res.send(data.gallery);
        }
        //return res.send(data);
        res.render('admin/gallery/index', data)
    })

    router.post('/gallery', async (req, res) => {
        try {
            var re = await file_uploader.upload_gallery(req.files.images, req);
            return res.redirect(req.originalUrl)
            //res.send(re);
        } catch (error) {
            res.send(error);
        }
    })

    return router;
}