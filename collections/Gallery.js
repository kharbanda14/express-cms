var mongoose = require('mongoose');


var collection_name = 'gallery';

var structure = {
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    tags: {
        type: Array
    },
    original: {
        type: String,
        trim: true,
        required:true,
    },
    small: {
        type: String,
        trim: true,
        required:true,
    },
    large: {
        type: String,
        trim: true,
        required:true,
    },
    medium: {
        type: String,
        trim: true,
        required:true,
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);