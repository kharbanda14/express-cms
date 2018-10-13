var mongoose = require('mongoose');


var collection_name = 'newsletter';

var structure = {
    email: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    topics: {
        type: Array,
        trim: true,
    },
    is_subscribed: {
        type:Boolean,
        default:true,
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
    updated_at : {
        type: Number,
        default: Date.now()
    }
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);