const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    date: {
        type: Date,
        required: false
    },
    moveInDate: {
        type: Date,
        required: false
    },
    contractEnds: {
        type: Date,
        required: false
    },
    contractTerminates: {
        type: Boolean,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    pics: [
        {
            url: {
                type: String,
                required: false,
            }
        }
    ],
    address: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    },
    numRoom: {
        type: Number,
        required: false
    },
    numBath: {
        type: Number,
        required: false
    },
    outdoorArea: {
        type: Boolean,
        required: false
    },
    garden: {
        type: Boolean,
        required: false
    },
    petsAllowed: {
        type: Boolean,
        required: false
    },
    parkingSpace: {
        type: Boolean,
        required: false
    },
    breakerId: {
        type: String,
        required: false
    },
    breakerName: {
        type: String,
        required: false
    },
    breakerEmail: {
        type: String,
        required: false
    },
    breakerPicture: {
        type: String,
        required: false
    },
    rent: {
        type: Number,
        required: false
    },
    walkToStation: {
        type: Boolean,
        required: false
    },
    walkToSupermarket: {
        type: Boolean,
        required: false
    },
    sharingWall: {
        type: Boolean,
        required: false
    },
    sharingFloor: {
        type: Boolean,
        required: false
    },
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);