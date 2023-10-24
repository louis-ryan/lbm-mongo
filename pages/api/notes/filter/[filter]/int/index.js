import dbConnect from '../../../../../../utils/dbConnect';
import Note from '../../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const { query: { filter } } = req;

    var searchLimit = 5
    var searchSkip = 10
    var filterObject = {}

    let userId;

    const listOfFilters = filter.split(";")

    listOfFilters.map((singleFilter) => {
        const [key, value] = singleFilter.split("=")

        switch (key) {

            case "userId":
                userId = value;
                break;

            case "searchLimit":
                searchLimit = value
                break;

            case "searchSkip":
                searchSkip = value
                break;

            case "address":
                const arrayOfPlaceNames = value.split(",")
                if (arrayOfPlaceNames[0] === '') return
                filterObject = { ...filterObject, address: arrayOfPlaceNames }
                break;

            case "type":
                if (!value) return
                const valueArray = value.split(",");
                filterObject = { ...filterObject, type: { $in: valueArray } }
                break;

            case "rent":
                const selectionArr = value.split(",")
                if (!selectionArr[0] && !selectionArr[1]) return
                filterObject = { ...filterObject, rent: { $gte: selectionArr[0], $lte: selectionArr[1] } }
                break;

            case "minBed":
                filterObject = { ...filterObject, numRoom: { $gte: value } }
                break;

            case "minBath":
                filterObject = { ...filterObject, numBath: { $gte: value } }
                break;

            case "petsAllowed":
                if (value !== "true") return
                filterObject = { ...filterObject, petsAllowed: true }
                break;

            case "parkingSpace":
                if (value !== "true") return
                filterObject = { ...filterObject, parkingSpace: true }
                break;

            case "terrace":
                if (value !== "true") return
                filterObject = { ...filterObject, outdoorArea: true }
                break;

            case "garden":
                if (value !== "true") return
                filterObject = { ...filterObject, garden: true }
                break;

            case "noSharedWalls":
                if (value !== "true") return
                filterObject = { ...filterObject, sharingWall: false }
                break;

            case "noSharedFloor":
                if (value !== "true") return
                filterObject = { ...filterObject, sharingFloor: false }
                break;

            case "walkToSupermarket":
                if (value !== "true") return
                filterObject = { ...filterObject, walkToSupermarket: true }
                break;

            case "walkToTrain":
                if (value !== "true") return
                filterObject = { ...filterObject, walkToStation: true }
                break;

            case "moveIn":
                const moveInArr = value.split(",")

                if (moveInArr[0] === '') return

                filterObject = { ...filterObject, moveInDate: { $lte: moveInArr[0] } }
                break;
        }
    })


    if (userId) {
        filterObject = { ...filterObject, breakerId: { $ne: userId } } // Exclude notes made by the user
    }


    try {
        const notes = await Note.find(filterObject)
            .skip(Number(searchSkip))
            .limit(Number(searchLimit))

        if (!notes) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: notes.length });
    } catch (error) {
        res.status(400).json({ success: false });
    }


}