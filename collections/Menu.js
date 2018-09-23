var mongoose = require('mongoose');

var collection_name = 'menus';

var structure = {
    title: {
        type: String,
        trim: true,
        required: true,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    links: [{
        title: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            trim: true,
        },
        openInNewTab: {
            type: Boolean,
            enum: [true, false],
            default: false,
        }
    }],
    created_at: {
        type: Number,
        default: Date.now()
    },
    last_edited: {
        type: Number,
        default: Date.now()
    }
}

var schema = new mongoose.Schema(structure);



module.exports = mongoose.model(collection_name, schema, collection_name);