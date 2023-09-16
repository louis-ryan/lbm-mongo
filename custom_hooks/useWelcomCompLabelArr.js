import { useState, useEffect } from 'react'


function useWelcomeCompLabelArr(filter) {

    const [activeLabelArr, setActiveLabelArr] = useState([])
    const [allowSetArr, setAllowSetArr] = useState(true)


    const labelsArr = [
        {
            name: 'Location',
            condition: (filter.addresses.length > 0),
            newFilter: { ...filter, addresses: [], selectedAreas: [] }
        },
        {
            name: 'Rent',
            condition: ((filter.selectedRentVal[0] > filter.minRentVal || filter.selectedRentVal[1] < filter.maxRentVal)),
            newFilter: { ...filter, selectedRentVal: [filter.minRentVal, filter.maxRentVal] }
        },
        {
            name: 'Bed/Livingrooms',
            condition: (filter.minBed > 0),
            newFilter: { ...filter, minBed: 0 }
        },
        {
            name: 'Bathrooms',
            condition: (filter.minBath > 0),
            newFilter: { ...filter, minBath: 0 }
        },
        {
            name: 'Pets allowed',
            condition: (filter.petsAllowed),
            newFilter: { ...filter, petsAllowed: false }
        },
        {
            name: 'Parking space',
            condition: (filter.parkingSpace),
            newFilter: { ...filter, parkingSpace: false }
        },
        {
            name: 'Terrace',
            condition: (filter.terrace),
            newFilter: { ...filter, terrace: false }
        },
        {
            name: 'Garden',
            condition: (filter.garden),
            newFilter: { ...filter, garden: false }
        },
        {
            name: 'No shared walls',
            condition: (filter.noSharedWalls),
            newFilter: { ...filter, noSharedWalls: false }
        },
        {
            name: 'No shared floor or ceiling',
            condition: (filter.noSharedFloor),
            newFilter: { ...filter, noSharedFloor: false }
        },
        {
            name: 'Supermarket less than 1 km',
            condition: (filter.walkToSupermarket),
            newFilter: { ...filter, walkToSupermarket: false }
        },
        {
            name: 'Train station less than 1 km',
            condition: (filter.walkToTrain),
            newFilter: { ...filter, walkToTrain: false }
        },
        {
            name: 'Earliest move-in date',
            condition: (filter.moveInEarliest),
            newFilter: { ...filter, moveInEarliest: null }
        },
        {
            name: 'Latest move-in date',
            condition: (filter.moveInLatest),
            newFilter: { ...filter, moveInLatest: null }
        }
    ]


    /**
     * Set arr for conditional arr header
     */
    useEffect(() => {

        if (!allowSetArr) return

        let activeLabels = []

        labelsArr.map((label, idx) => {
            if (label.condition) {
                activeLabels.push(idx)
            }
        })

        setActiveLabelArr(activeLabels)
        setAllowSetArr(false)
    })

    /**
     * Init arr
     */
    useEffect(() => {
        
        setAllowSetArr(true)
    }, [filter])


    return [
        activeLabelArr,
        labelsArr,
        setAllowSetArr
    ]

}

export default useWelcomeCompLabelArr