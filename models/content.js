const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    contentType: {
        type: String,
        enum: ['video', 'audio'],
        required: true
    },
    duration: {
        type: String
    },
    url: {
        type: String, // s3url
        required: true
    },
    thumbnail: {
        type: String
    },
    category: {
        type: String
    },
    tags: {
        type: [String]  
    }
});

module.exports = mongoose.model('Content', contentSchema);