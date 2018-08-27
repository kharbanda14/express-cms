var mongoose = require('mongoose');
var post_types = require('../config/post_types');

var collection_name = 'posts';

var structure = {
    title: {
        type:String,
        trim:true,
        required:true,
    },
    content:{
        type:String,
        trim:true,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    post_type:{
        type:String,
        required:true,
        enum:post_types.map(v => v.type),
        default:'post'
    },
    tags:{
        type:Array
    },
    post_status:{
        type:String,
        enum:['published','draft'],
        default:'published',
    },
    feautred_image:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },
    created_at: {
        type: Number,
        default: Date.now()
    }
}

var schema = new mongoose.Schema(structure);

module.exports = mongoose.model(collection_name, schema, collection_name);