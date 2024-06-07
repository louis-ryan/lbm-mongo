import dbConnect from '../../../../../../utils/dbConnect';
import Application from '../../../../../../models/Application';

dbConnect();

function transformNoteArray(noteArr) {

    // Create a map to store the frequency data
    const noteMap = new Map();

    // Iterate over the noteArr
    noteArr.forEach(note => {
        const { noteId, new: isNew } = note;

        // Initialize the note data in the map if it doesn't exist
        if (!noteMap.has(noteId)) {
            noteMap.set(noteId, { totalApplications: 0, totalNewApplications: 0 });
        }

        // Increment the totalApplications count
        noteMap.get(noteId).totalApplications += 1;

        // Increment the totalNewApplications count if new is true
        if (isNew) {
            noteMap.get(noteId).totalNewApplications += 1;
        }
    });

    // Convert the map to the desired array format
    const listingArr = Array.from(noteMap, ([noteId, { totalApplications, totalNewApplications }]) => ({
        noteId,
        totalApplications,
        totalNewApplications
    }));

    return listingArr;
}


export default async (req, res) => {
    const {
        query: { userId },
        method
    } = req;

    let totalNewApplications = 0

    switch (method) {
        case 'GET':
            try {
                const applications = await Application.find({ breakerId: userId });

                let noteArr = []

                applications.forEach((application) => {

                    if (application.seenByBreaker) {

                        noteArr.push({ noteId: application.noteId, new: false })
                    } else {

                        totalNewApplications++

                        noteArr.push({ noteId: application.noteId, new: true })
                    }
                })

                if (!applications) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({
                    success: true,
                    data: {
                        totalApplications: applications.length,
                        totalNewApplications: totalNewApplications,
                        listingArr: transformNoteArray(noteArr)
                    }
                });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}