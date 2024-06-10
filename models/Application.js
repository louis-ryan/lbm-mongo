const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    applicantId: {
        type: String,
        required: true
    },
    applicantPic: String,
    applicantName: String,
    applicantEmail: String,
    applicantPhone: String,
    applicantSocial: String,
    applicantDocuments: [
        {
            fileName: String,
            field: {
                type: String,
                enum: ['ID', 'POI', 'RR'],
            },
            type: {
                type: String,
                enum: ['img', 'pdf']
            },
            url: String,
            previewUrl: String,

        }
    ],
    applicantMessage: String,
    noteId: {
        type: String,
        required: true
    },
    breakerId: String,
    seenByBreaker: Boolean
})

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);