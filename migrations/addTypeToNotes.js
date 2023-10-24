const dbConnect = require('../utils/dbConnect');
const Note = require('../models/Note');


async function addTypeToAllNotes() {
    try {
        await dbConnect();

        const filter = { type: { $exists: false } }; 
        const update = { $set: { type: 'APARTMENT' } };

        const result = await Note.updateMany(filter, update);

        console.log(`${result.nModified} notes were updated.`);
    } catch (error) {
        console.error('Error updating notes:', error);
    }
}

addTypeToAllNotes();