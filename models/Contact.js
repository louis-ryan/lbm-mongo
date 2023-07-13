const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userPhone: {
        type: String
    },
    userSocial: {
        type: String
    }
})

module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);