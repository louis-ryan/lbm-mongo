const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    addresses: [
        {
            type: String
        }
    ],
    selectedAreas: [
        {
            type: String
        }
    ],
    rent: [
        {
            type: Number
        }
    ],
    minRentVal: {
        type: Number
    },
    maxRentVal: {
        type: Number
    },
    selectedRentVal: [
        {
            type: Number
        }
    ],
    minBed: {
        type: Number
    },
    minBath: {
        type: Number
    },
    petsAllowed: {
        type: Boolean
    },
    parkingSpace: {
        type: Boolean
    },
    terrace: {
        type: Boolean
    },
    garden: {
        type: Boolean
    },
    noSharedWalls: {
        type: Boolean
    },
    noSharedFloor: {
        type: Boolean
    },
    walkToSupermarket: {
        type: Boolean
    },
    walkToTrain: {
        type: Boolean
    },
    moveInEarliest: {
        type: Date
    },
    moveInLatest: {
        type: Date
    }
})

module.exports = mongoose.models.Filter || mongoose.model('Filter', FilterSchema);