var mongoose = require('mongoose');


var collection_name = 'forms';

var structure = {
    title: {
        type: String,
        required:true,
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
    accepting_responses: {
        type: Boolean,
        default:true,
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);