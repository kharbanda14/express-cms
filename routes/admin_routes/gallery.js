const post_types = require('../../config/post_types');
const Post = require('../../models/posts_model');
const check = post_types.map(v => v.type);
const path = require('path');
const file_uploader = require('../../lib/file_uploader');
module.exports = function (router) {
    router.get('/gallery', (req, res) => {
        var data = {
            
            load_page: 'gallery/index.ejs',
           
        }
        // return res.send(data);
        res.render('admin/index', data)
    })

    router.post('/gallery', (req,res) => {
        console.log(req.files);
        file_uploader.upload_gallery(req.files);
        res.send(req.files)
    })

    return router;
}