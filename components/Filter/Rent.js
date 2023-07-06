import { useEffect, useState } from "react";
import FilterHeader from "./FilterHeader";
import ReactSlider from 'react-slider'


const RentFilter = ({ reveal, setReveal, deviceSize, filter, setFilter, notes }) => {

    const [minVal, setMinVal] = useState(null)
    const [maxVal, setMaxVal] = useState(null)
    const [rentArr, setRentArr] = useState([])

    const [selectedVal, setSelectedVal] = useState([minVal, maxVal])

    const [graphicArr, setGraphicArr] = useState([{}])
    const [highestFreq, setHighestFreq] = useState(0)

    const activeCondition = (minVal && maxVal && (filter.selectedRentVal[0] !== minVal || filter.selectedRentVal[1] !== maxVal))
    const setValCondition = (filter.selectedRentVal[0] !== selectedVal[0] || filter.selectedRentVal[1] !== selectedVal[1])

    const graphicStyle = { height: "72px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }


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

        const res = await fetch(`api/notes`);
        const { data } = await res.json();

        data.map((note) => {
            if (!note.rent) return
            rentArr.push(note.rent)
        })
        var sortedRentArr = rentArr.sort((a, b) => { return a - b })

        setMinVal(sortedRentArr[0])
        setMaxVal(sortedRentArr[sortedRentArr.length - 1])
        setRentArr(sortedRentArr)
    }


    useEffect(() => {
        handleSetGraphicArr(rentArr)
    }, [rentArr])


    /**
     * Map notes and assign Min and Max to range
     */
    useEffect(() => {
        getCompleteNotes()
    }, [notes, filter])


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


    /**
     * Set init selection if no auth user
     */
    useEffect(() => {
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


    return (
        <>
            <div
                className="filter-box"
                style={{
                    border: activeCondition ? "#50554A 4px solid" : "2px solid #50554A",
                    width: reveal === "RENT" && deviceSize === "MOBILE" && "100%",
                }}
            >

                <FilterHeader
                    headerTitle={'Rent'}
                    headerSubTitle={`$${selectedVal[0]}pw to $${selectedVal[1]}pw`}
                    activeCondition={activeCondition}
                    onClick={() => reveal === "RENT" ? setReveal("NONE") : setReveal("RENT")}
                    icon={
                        <g id="Rent" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <ellipse id="Oval-Copy-5" stroke="#979797" cx="20" cy="23.5" rx="14.5" ry="2"></ellipse>
                            <path d="M33.6774381,25.9921909 C32.9416449,26.2882512 31.8625403,26.551547 30.5244022,26.77457 C27.8309728,27.2234749 24.1099621,27.5 20.0020815,27.5000043 C15.5813995,27.4816007 11.9547671,27.1992414 9.33648516,26.7510736 C8.0412418,26.5293685 6.99832008,26.2694729 6.28771729,25.9780366 C5.99011378,25.8559818 5.75657805,25.7331378 5.60172232,25.6004738 C5.7187161,25.3204411 5.83608144,25.2331693 5.98965142,25.1563524 C6.45841274,24.9218741 7.14226145,24.7073183 8.00038949,24.5123066 C10.6916178,25.0948083 14.875414,25.4785396 19.6003104,25.4991301 C24.792711,25.4999971 29.070288,25.1256281 31.8421532,24.5457505 C32.7654055,24.7225198 33.4834288,24.9258477 33.974059,25.1529285 C34.2305846,25.7416599 33.9874087,25.8674684 33.6774381,25.9921909 Z" id="Combined-Shape" stroke="#979797"></path>
                            <path d="M33.6774381,27.9921313 C32.9416449,28.2881916 31.8625403,28.5514873 30.5244022,28.7745103 C27.8309728,29.2234152 24.1099621,29.4999404 20.0020815,29.4999447 C15.5813995,29.4815411 11.9547671,29.1991818 9.33648516,28.7510139 C8.0412418,28.5293088 6.99832008,28.2694133 6.28771729,27.977977 C5.99011378,27.8559222 5.75657805,27.7330782 5.60172232,27.6004142 C5.7187161,27.3203815 5.83608144,27.2331097 5.98965142,27.1562927 C6.45841274,26.9218145 7.14226145,26.7072587 8.00038949,26.5122469 C10.6916178,27.0947486 14.875414,27.47848 19.6003104,27.4990704 C24.792711,27.4999374 29.070288,27.1255685 31.8421532,26.5456909 C32.7654055,26.7224601 33.4834288,26.9257881 33.974059,27.1528688 C34.2305846,27.7416003 33.9874087,27.8674087 33.6774381,27.9921313 Z" id="Combined-Shape-Copy" stroke="#979797"></path>
                            <path d="M33.6774381,29.9921313 C32.9416449,30.2881916 31.8625403,30.5514873 30.5244022,30.7745103 C27.8309728,31.2234152 24.1099621,31.4999404 20.0020815,31.4999447 C15.5813995,31.4815411 11.9547671,31.1991818 9.33648516,30.7510139 C8.0412418,30.5293088 6.99832008,30.2694133 6.28771729,29.977977 C5.99011378,29.8559222 5.75657805,29.7330782 5.60172232,29.6004142 C5.7187161,29.3203815 5.83608144,29.2331097 5.98965142,29.1562927 C6.45841274,28.9218145 7.14226145,28.7072587 8.00038949,28.5122469 C10.6916178,29.0947486 14.875414,29.47848 19.6003104,29.4990704 C24.792711,29.4999374 29.070288,29.1255685 31.8421532,28.5456909 C32.7654055,28.7224601 33.4834288,28.9257881 33.974059,29.1528688 C34.2305846,29.7416003 33.9874087,29.8674087 33.6774381,29.9921313 Z" id="Combined-Shape-Copy-2" stroke="#979797"></path>
                            <path d="M33.6774381,31.9921313 C32.9416449,32.2881916 31.8625403,32.5514873 30.5244022,32.7745103 C27.8309728,33.2234152 24.1099621,33.4999404 20.0020815,33.4999447 C15.5813995,33.4815411 11.9547671,33.1991818 9.33648516,32.7510139 C8.0412418,32.5293088 6.99832008,32.2694133 6.28771729,31.977977 C5.99011378,31.8559222 5.75657805,31.7330782 5.60172232,31.6004142 C5.7187161,31.3203815 5.83608144,31.2331097 5.98965142,31.1562927 C6.45841274,30.9218145 7.14226145,30.7072587 8.00038949,30.5122469 C10.6916178,31.0947486 14.875414,31.47848 19.6003104,31.4990704 C24.792711,31.4999374 29.070288,31.1255685 31.8421532,30.5456909 C32.7654055,30.7224601 33.4834288,30.9257881 33.974059,31.1528688 C34.2305846,31.7416003 33.9874087,31.8674087 33.6774381,31.9921313 Z" id="Combined-Shape-Copy-3" stroke="#979797"></path>
                            <ellipse id="Oval-Copy-4" stroke="#979797" transform="translate(21.000000, 14.500000) rotate(20.000000) translate(-21.000000, -14.500000) " cx="21" cy="14.5" rx="14.5" ry="2"></ellipse>
                        </g>
                    }

                />

                {reveal === "RENT" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            <div
                                style={{
                                    ...graphicStyle,
                                    opacity: graphicArr[1].rentVal === null ? "0" : "1",
                                    transition: "1s"
                                }}
                            >
                                {graphicArr.map((obj, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                width: `calc(100% / ${graphicArr.length})`,
                                                height: `calc((100% / ${highestFreq}) * ${obj.numberWithVal})`,
                                                background: "grey"
                                            }}
                                        />
                                    )
                                })}
                            </div>

                            <ReactSlider
                                className="slider"
                                thumbClassName="slider-thumb"
                                trackClassName="slider-track"
                                defaultValue={[minVal, maxVal]}
                                ariaLabel={['Leftmost thumb', 'Rightmost thumb']}
                                renderThumb={(props) => <div {...props}></div>}
                                pearling
                                minDistance={10}
                                onChange={(value) => { setSelectedVal(value) }}
                                value={selectedVal}
                                min={minVal}
                                max={maxVal}
                            />

                            <div style={{ height: "24px" }} />

                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <div>min: ${minVal}pw</div>
                                <div>max: ${maxVal}pw</div>
                            </div>

                            <div style={{ height: "48px" }} />

                            {setValCondition && (
                                <div
                                    className="button-action"
                                    onClick={() => {
                                        setFilter({
                                            ...filter,
                                            minRentVal: minVal,
                                            maxRentVal: maxVal,
                                            selectedRentVal: selectedVal,
                                        })
                                    }}
                                    style={{ width: "100%", display: "flex", justifyContent: "center", padding: "16px 0px", cursor: "pointer" }}
                                >
                                    <div>SET RANGE ${selectedVal[0]} - ${selectedVal[1]}</div>
                                </div>
                            )}

                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default RentFilter;