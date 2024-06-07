const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    field: {
        type: String
    },
    type: {
        type: String
    },
    url: {
        type: String
    },
    previewUrl: {
        type: String
    }
})

module.exports = mongoose.models.Document || mongoose.model('Document', DocumentSchema);