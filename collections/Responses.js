var mongoose = require('mongoose');


var collection_name = 'responses';

var structure = {
    form_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'forms'
    },
    body: {
        type: Object,
        required:true,
    },
    tracking: {
        ip : {
            type:String,
        },
        utm_source :{
            type:String,
            trim:true
        },
        utm_medium: {
            type:String,
            trim:true
        },
        utm_campaign: {
            type:String,
            trim:true
        },
        utm_term: {
            type:String,
            trim:true
        },
        utm_content: {
            type:String,
            trim:true
        },
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);