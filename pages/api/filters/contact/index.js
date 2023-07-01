import dbConnect from '../../../../utils/dbConnect';
import Filter from '../../../../models/Filter';
import dotenv from 'dotenv';

dotenv.config();

dbConnect();

export default async (req, res) => {


    const { method } = req;


    switch (method) {
        case 'POST':
            try {
                const filters = await Filter.find({});

                filters.map((filter) => {

                    var addressWithinArr = false
                    var higherThanMinRent = false
                    var lowerThanMaxRent = false
                    var canMoveInAfterEarliest = false
                    var canMoveInBeforeLatest = false
                    var petsMatch = false
                    var parkingMatch = false
                    var outdoorMatch = false
                    var gardenMatch = false
                    var wallMatch = false
                    var floorMatch = false
                    var supermarketMatch = false
                    var trainMatch = false
                    var higherThanMinBed = false
                    var higherThanMinBath = false

                    // Address
                    if (filter.addresses.length > 0) {
                        filter.addresses.map((address) => {
                            if (req.body.address === address) {
                                addressWithinArr = true
                            }
                        })
                    } else {
                        addressWithinArr = true
                    }

                    // Rent
                    if (filter.selectedRentVal.length > 0) {
                        if (req.body.rent > filter.selectedRentVal[0]) { higherThanMinRent = true }
                        if (req.body.rent < filter.selectedRentVal[1]) { lowerThanMaxRent = true }
                    } else {
                        higherThanMinRent = true
                        lowerThanMaxRent = true
                    }

                    // Move-in earliest
                    if (filter.moveInEarliest !== null) {

                        var reqEarliestMoveIn = Math.floor(new Date(req.body.moveInDate).getTime() / 1000)
                        var filterEarliestMoveIn = Math.floor(new Date(filter.moveInEarliest).getTime() / 1000)

                        if (reqEarliestMoveIn > filterEarliestMoveIn) { canMoveInAfterEarliest = true }

                    } else {
                        canMoveInAfterEarliest = true
                    }


                    // Move-in latest
                    if (filter.moveInLatest !== null) {

                        var reqEarliestMoveIn = Math.floor(new Date(req.body.moveInDate).getTime() / 1000)
                        var filterLatestMoveIn = Math.floor(new Date(filter.moveInLatest).getTime() / 1000)

                        if (reqEarliestMoveIn < filterLatestMoveIn) { canMoveInBeforeLatest = true }

                    } else { canMoveInBeforeLatest = true }


                    // Pets
                    if (filter.petsAllowed === true) {
                        if (req.body.petsAllowed === true) { petsMatch = true }
                    } else { petsMatch = true }


                    // Parking
                    if (filter.parkingSpace === true) {
                        if (req.body.parkingSpace === true) { parkingMatch = true }
                    } else { parkingMatch = true }


                    // Terrace
                    if (filter.terrace === true) {
                        if (req.body.outdoorArea === true) { outdoorMatch = true }
                    } else { outdoorMatch = true }


                    // Garden
                    if (filter.garden === true) {
                        if (req.body.garden === true) { gardenMatch = true }
                    } else { gardenMatch = true }


                    // Sharing Wall
                    if (filter.noSharedWalls === true) {
                        if (req.body.sharingWall === false) { wallMatch = true }
                    } else { wallMatch = true }


                    // Sharing Floor
                    if (filter.noSharedFloor === true) {
                        if (req.body.sharingFloor === false) { floorMatch = true }
                    } else { floorMatch = true }


                    // Supermarket
                    if (filter.walkToSupermarket === true) {
                        if (req.body.supermarket === true) { supermarketMatch = true }
                    } else { supermarketMatch = true }


                    // Train
                    if (filter.walkToTrain === true) {
                        if (req.body.trainStation === true) { trainMatch = true }
                    } else { trainMatch = true }


                    // Min Bed
                    if (filter.minBed > 0) {
                        if (req.body.numRoom >= filter.minBed) { higherThanMinBed = true }
                    } else { higherThanMinBed = true }


                    // Min Bath
                    if (filter.minBath > 0) {
                        if (req.body.numBath >= filter.minBath) { higherThanMinBath = true }
                    } else { higherThanMinBath = true }

                    if (!filter.userName) return

                    if (filter.email === req.body.breakerEmail) return

                    // console.log("matching?? ",
                    //     addressWithinArr,
                    //     higherThanMinRent,
                    //     lowerThanMaxRent,
                    //     canMoveInAfterEarliest,
                    //     canMoveInBeforeLatest,
                    //     petsMatch,
                    //     parkingMatch,
                    //     outdoorMatch,
                    //     gardenMatch,
                    //     wallMatch,
                    //     floorMatch,
                    //     supermarketMatch,
                    //     trainMatch,
                    //     higherThanMinBed,
                    //     higherThanMinBath
                    // )

                    console.log(process.env.EMAIL_ROOT_URL);

                    process

                    if (
                        addressWithinArr === true &&
                        higherThanMinRent === true &&
                        lowerThanMaxRent === true &&
                        canMoveInAfterEarliest === true &&
                        canMoveInBeforeLatest === true &&
                        petsMatch === true &&
                        parkingMatch === true &&
                        outdoorMatch === true &&
                        gardenMatch === true &&
                        wallMatch === true &&
                        floorMatch === true &&
                        supermarketMatch === true &&
                        trainMatch === true &&
                        higherThanMinBed === true &&
                        higherThanMinBath === true
                    ) {
                        async function sendEmail() {

                            try {
                                await fetch('http://localhost:3000/api/contact', {
                                    method: "POST",
                                    body: JSON.stringify({
                                        type: "NEW_MESSAGE",
                                        name: filter.userName,
                                        email: filter.userEmail,
                                        subject: 'A new property matches your filter!',
                                        picture: req.body.pics[0].url,
                                        header: `Hi, ${filter.userName} This property matches a filter`,
                                        message: req.body.description,
                                        link: `http://localhost:3000/${req.body._id}`,
                                    }),
                                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                                }).then((res) => {
                                    if (!res.ok) throw new Error("Failed to send message");
                                    return res.json();
                                })
                            } catch (error) {
                                console.log("send email err: ", error)
                            }
                        };
                        sendEmail()
                    }

                })

                res.status(201).json({ success: true, data: filters })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}