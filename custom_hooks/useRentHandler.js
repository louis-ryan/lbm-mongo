import { useState, useEffect } from 'react'

function useRentHandler(filter, setFilter, user) {

    const [minVal, setMinVal] = useState(null)
    const [maxVal, setMaxVal] = useState(null)
    const [rentArr, setRentArr] = useState([])

    const [selectedVal, setSelectedVal] = useState([minVal, maxVal])

    const [graphicArr, setGraphicArr] = useState([{}])
    const [highestFreq, setHighestFreq] = useState(0)

    const activeCondition = (minVal && maxVal && (filter.selectedRentVal[0] !== minVal || filter.selectedRentVal[1] !== maxVal))
    const setValCondition = (filter.selectedRentVal[0] !== selectedVal[0] || filter.selectedRentVal[1] !== selectedVal[1])


    const handleSetGraphicArr = (sortedRentArr) => {
        var newGraphicArr = [{}]

        var newHighestFreq = 0

        for (var i = minVal; i <= maxVal; i++) {
            var availableArr = []
            sortedRentArr.map((rent) => {
                if (i === rent) {
                    availableArr.push(rent)
                }
            })

            if (availableArr.length > newHighestFreq) {
                newHighestFreq = availableArr.length
            }

            newGraphicArr.push({
                rentVal: i,
                numberWithVal: availableArr.length
            })
        }
        setGraphicArr(newGraphicArr)
        setHighestFreq(newHighestFreq)
    }


    async function getCompleteNotes() {
        var rentArr = []

        const res = await fetch(`api/notes/rent`);
        const { data } = await res.json();

        data.map((rent) => {
            if (!rent) return
            rentArr.push(rent)
        })
        var sortedRentArr = rentArr.sort((a, b) => { return a - b })

        setMinVal(sortedRentArr[0])
        setMaxVal(sortedRentArr[sortedRentArr.length - 1])
        setRentArr(sortedRentArr)
    }



    /**
     * Set init selection if no auth user
     */
    useEffect(() => {

        if (user !== undefined) return

        if (filter.selectedRentVal[0] === null && filter.selectedRentVal[1] === null) {

            setSelectedVal([minVal, maxVal])
            setFilter({
                ...filter,
                minRentVal: minVal,
                maxRentVal: maxVal,
                selectedRentVal: [minVal, maxVal],
            })
        }
    }, [minVal, maxVal])
    


    useEffect(() => {
        handleSetGraphicArr(rentArr)
    }, [rentArr])


    /**
     * Map notes and assign Min and Max to range
     */
    useEffect(() => {
        getCompleteNotes()
    }, [])


    /**
     * Set init selection based on min and max
     */
    useEffect(() => {
        if (filter.selectedRentVal !== []) {
            setSelectedVal([filter.selectedRentVal[0], filter.selectedRentVal[1]])
        } else {
            setSelectedVal([minVal, maxVal])
        }
    }, [filter, minVal, maxVal])


    return [
        graphicArr,
        highestFreq,
        activeCondition,
        setValCondition,
        selectedVal,
        setSelectedVal,
        minVal,
        maxVal
    ]
}

export default useRentHandler