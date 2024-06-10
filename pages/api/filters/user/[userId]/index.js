import dbConnect from '../../../../../utils/dbConnect';
import Filter from '../../../../../models/Filter';
import Note from '../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const { query: { userId } } = req;

    try {

        const notes = await Note.find({});

        let rentArr = []

        notes.map((note) => {
            rentArr.push(note.rent)
        })

        var sortedRentArr = rentArr.sort((a, b) => { return a - b })

        const filter = await Filter.find({ userId: userId });

        if (!filter) {
            return res.status(400).json({ success: false });
        }

        var lastFilter = filter[filter.length - 1]

        lastFilter.minRentVal = sortedRentArr[0]
        lastFilter.maxRentVal = sortedRentArr[sortedRentArr.length - 1]




        var noFilters = (lastFilter === undefined)

        if (noFilters) {
            lastFilter = {
                addresses: [],
                type: [],
                selectedAreas: [],
                rent: sortedRentArr,
                selectedRentVal: [
                    sortedRentArr[0],
                    sortedRentArr[sortedRentArr.length - 1]
                ],
                minRentVal: sortedRentArr[0],
                maxRentVal: sortedRentArr[sortedRentArr.length - 1],
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