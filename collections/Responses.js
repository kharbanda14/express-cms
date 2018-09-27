var mongoose = require('mongoose');


var collection_name = 'responses';

var structure = {
    form_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'forms'
    },
    body: {
        type: Array,
        required:true,
    },
    tracking: {
        ip : {
            type:String,
        },
        source_url : {
            type:String,
        },
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);