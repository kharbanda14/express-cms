var Form = require('../collections/Forms');

module.exports.createForm = (data) => {
    return new Form(data).save();
}
module.exports.getAll = (query = {}, limit = 10, skip = 0) => {
    return Form.find(query).limit(limit).skip(skip).lean();
}
/**
 * 
 * @param {ObjectId} id - Id of the Form
 */
module.exports.findById = (id) => {
    return Form.findById(id).lean();
}

module.exports.updateForm = (id, body) => {
    return Form.findByIdAndUpdate(id, body);
}