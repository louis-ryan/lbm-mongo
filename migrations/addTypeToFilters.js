const dbConnect = require('../utils/dbConnect');
const Filter = require('../models/Filter');


async function addTypeToAllFilters() {
    try {
        await dbConnect();

        const update = { $set: { type: [] } };

        const result = await Filter.updateMany(update);

        console.log(`${result.nModified} notes were updated.`);
    } catch (error) {
        console.error('Error updating notes:', error);
    }
}

addTypeToAllFilters();