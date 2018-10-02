const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const gallery_model = require('../models/gallery_model');
/**
 * 
 * @param {*} files Uploads images
 */

function gallery_uploader(files, req) {
    return new Promise(async (resolve, reject) => {
        let d = new Date();
        let folder = `uploads/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/`;
        createDirRecursive(folder);
        if (typeof files == 'object') {
            var sizes = [1024, 768, 256];
            var sizes_name = {
                1024: 'large',
                768: 'medium',
                256: 'small',
            }
            var insert = [];
            if (Array.isArray(files)) {
                /** Multiple Files */
                for (const file of files) {
                    let eachImg = {};
                    try {
                        var thefile = await uploadFile(file, folder);
                    } catch (error) {
                        return reject(error);
                    }
                    eachImg['original'] = getHttpPath(thefile);
                    eachImg['user_id'] = req.session.admin._id;
                    for (const size of sizes) {
                        var pr = await processImage(thefile, size, size);
                        eachImg[sizes_name[size]] = getHttpPath(pr);
                    }
                    insert.push(eachImg);
                }
            } else {
                let eachImg = {};
                var thefile = await uploadFile(files, folder);
                eachImg['user_id'] = req.session.admin._id;
                eachImg['original'] = getHttpPath(thefile);
                for (const size of sizes) {
                    var pr = await processImage(thefile, size, size);
                    eachImg[sizes_name[size]] = getHttpPath(pr);
                }
                insert.push(eachImg);
            }
            try {
                const gallery_added = await gallery_model.insertGallery(insert);
                resolve(gallery_added);
            } catch (e) {
                reject(e);
            }
        }
    });
}

function uploadFile(file, folder) {
    const location = path.resolve(APP_DIR, folder) + path.sep + file.name;
    return new Promise((resolve, reject) => {
        file.mv(location, (err) => {
            if (err) return reject(err);

            return resolve(location);
        });
    });
}

function _createDirRecursive(folder) {
    folder.split(path.sep).reduce((parent, child) => {
        var curDir = path.resolve(APP_DIR, parent, child);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }
        return curDir;
    });
}

function createDirRecursive(folder) {
    folder = path.normalize(folder);
    const dirs = folder.split(path.sep)
    let curdir = APP_DIR;
    for (const dir of dirs) {
        let next = path.join(curdir, dir);
        if (!fs.existsSync(next)) {
            fs.mkdirSync(next);
        }
        curdir = next;
    }
}

function processImage(location, width, height) {
    return new Promise((resolve, reject) => {
        let {
            name,
            dir,
            ext
        } = path.parse(location);
        let saveName = `${dir}/${name}_${width}x${height}.jpg`;

        sharp(location).resize(width).toFile(saveName, (err, info) => {
            if (err) return reject(err)
            return resolve(saveName);
        })
    });
}

function getHttpPath(path) {
    return path.replace(APP_DIR, '');
}

module.exports = {
    upload_gallery: gallery_uploader
};