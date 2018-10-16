var mongoose = require('mongoose');


var collection_name = 'visits';

var structure = {
    url: {
        type: String,
        trim: true,
    },
    ip: {
        type: String,
        trim: true,
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);