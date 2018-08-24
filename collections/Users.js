var mongoose = require('mongoose');

var collection_name = 'users';

var structure = {
    username: {
        type: String,
        required: true,
        trim: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
    },
    role:{
        type:String,
        enum:[
            'admin',
            'subscriber'
        ],
        default: 'subscriber'
    },
    created_at: {
        type: Number,
        default:Date.now()
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}

var schema = new mongoose.Schema(structure);

module.exports = mongoose.model(collection_name,schema,collection_name);