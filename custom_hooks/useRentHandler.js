import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0';


function useRentHandler(filter, setFilter) {

    const { user } = useUser()

    const [minVal, setMinVal] = useState(null)
    const [maxVal, setMaxVal] = useState(null)
    const [rentArr, setRentArr] = useState([])

    const [selectedVal, setSelectedVal] = useState([minVal, maxVal])

    const [graphicArr, setGraphicArr] = useState([{}])
    const [highestFreq, setHighestFreq] = useState(0)

    const [mounted, setMounted] = useState(true)

    var activeCondition

    if (filter.userId) {
        activeCondition = (minVal && maxVal && (filter.selectedRentVal[0] !== minVal || filter.selectedRentVal[1] !== maxVal))
    } else {
        activeCondition = (minVal && maxVal && (selectedVal[0] !== minVal || selectedVal[1] !== maxVal))
    }



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


    const setInitVals = (sortedRentArr) => {
        if (sortedRentArr !== []) {
            setSelectedVal([filter.selectedRentVal[0], filter.selectedRentVal[1]])
        } else {
            setSelectedVal([minVal, maxVal])
        }
    }


    async function getCompleteNotes() {

        const res = await fetch(`api/notes/rent`);
        const { data } = await res.json();

        setMinVal(data[0])
        setMaxVal(data[data.length - 1])
        setRentArr(data)

        setInitVals(data)

        const noFilter = filter.userId === null

        if (noFilter) {
            if (!user) return
            if (!mounted) return
            setSelectedVal([data[0], data[data.length - 1]])
            setMounted(false)
        }


    }


    useEffect(() => {
        handleSetGraphicArr(rentArr)
    }, [rentArr])


    /**
     * Map notes and assign Min and Max to range
     */
    useEffect(() => {
        getCompleteNotes()
    }, [filter])


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