import dbConnect from '../../../../../utils/dbConnect';
import Filter from '../../../../../models/Filter';
import Note from '../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const { query: { userId } } = req;

    try {

        const notes = await Note.find({});

        const filter = await Filter.find({ userId: userId });

        if (!filter) {
            return res.status(400).json({ success: false });
        }

        var lastFilter = filter[filter.length - 1]


        var noFilters = (lastFilter === undefined)

        if (noFilters) {
            lastFilter = {
                addresses: [],
                selectedAreas: [],
                rent: [notes],
                selectedRentVal: [
                    notes[0],
                    notes[notes.length - 1]
                ],
                minRentVal: notes[0],
                maxRentVal: notes[notes.length - 1],
                minBed: 0,
                minBath: 0,
                petsAllowed: false,
                parkingSpace: false,
                terrace: false,
                garden: false,
                noSharedWalls: false,
                noSharedFloor: false,
                walkToSupermarket: false,
                walkToTrain: false,
                moveInEarliest: null,
                moveInLatest: null,
                userId: "",
                userName: "",
                userEmail: "",
                _id: null,
                __v: 0
            }
        }


        res.status(200).json({ success: true, data: lastFilter });
    } catch (error) {
        res.status(400).json({ success: false });
    }


}