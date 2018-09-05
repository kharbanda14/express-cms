var Gallery = require('../collections/Gallery');

module.exports.insertGallery = (data) => {
    return Gallery.insertMany(data);
}
module.exports.getGallery = () => {
    return Gallery.find().lean().exec();
}