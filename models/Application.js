const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    applicantId: {
        type: String,
        required: true
    },
    applicantPic: {
        type: String
    },
    applicantName: {
        type: String
    },
    applicantEmail: {
        type: String
    },
    applicantPhone: {
        type: String
    },
    applicantSocial: {
        type: String
    },
    applicantDocuments: [
        {
            fileName: {
                type: String
            },
            field: {
                type: String,
                enum: ['ID', 'POI', 'RR'],
            },
            type: {
                type: String,
                enum: ['img', 'pdf']
            },
            url: {
                type: String
            },

        }
    ],
    applicantMessage: {
        type: String
    },
    noteId: {
        type: String,
        required: true
    },
    breakerId: {
        type: String
    },
    seenByBreaker: {
        type: Boolean
    }
})

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);