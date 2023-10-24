import { useEffect, useState } from "react";
import mapArr from './MapArr';
import FilterHeader from "./FilterHeader";
import locationIcon from '../../public/filter_icons/Location.svg';


const Location = ({ reveal, setReveal, filter, setFilter }) => {

    const [view, setView] = useState("AREA")
    const [filterRendered, setFilterRendered] = useState(false)

    const [areaSelectedArr, setAreaSelectedArr] = useState([])
    const [selectionArr, setSelectionArr] = useState([])
    const [areasArr, setAreasArr] = useState([])

    const activeCondition = filter.addresses.length && filter.addresses.length > 0


    const handleFilterAdd = (postCodes, areaSelectedArr) => {
        var singleAddressesArr = []
        postCodes.map((code) => {
            if (singleAddressesArr.includes(code.place_name)) return
            singleAddressesArr.push(code.place_name)
        })
        setFilter({ ...filter, addresses: singleAddressesArr, selectedAreas: areaSelectedArr })
    }


    const filterAddressesFromRegions = (selectionArr, areaSelectedArr) => {
        async function getPostCodes() {
            const res = await fetch(`./postCodes.json?`);
            const data = await res.json()
            let postCodeArr = []
            selectionArr.map((selection) => {
                mapArr.map((map) => {
                    if (map.name !== selection) return
                    const latitudeRange = (lat) => (lat < map.latStarts && lat > map.latEnds)
                    const longitudeRange = (long) => (long > map.longStarts && long < map.longEnds)
                    data.map((postCode) => {
                        if (!(latitudeRange(postCode.latitude) && longitudeRange(postCode.longitude))) return
                        postCodeArr.push(postCode)

                    })
                })
            })
            handleFilterAdd(postCodeArr, areaSelectedArr)
        }
        getPostCodes()

    }


    const filterRegionsFromAreas = (areaSelectedArr, filterAddresses) => {
        var newAvailableRegions = []
        areaSelectedArr.map((area) => {
            mapArr.map((map) => {
                if (map.area === area) {
                    newAvailableRegions.push(map.name)
                }
            })
        })
        setSelectionArr(newAvailableRegions)
        if (!filterAddresses) return
        filterAddressesFromRegions(newAvailableRegions, areaSelectedArr)
    }


    const handleAreaSelection = (selection) => {
        var newAreaSelectedArr = [...areaSelectedArr]
        var index = newAreaSelectedArr.indexOf(selection)

        if (index === -1) {
            newAreaSelectedArr.push(selection)
        } else {
            newAreaSelectedArr.splice(index, 1)
        }
        setAreaSelectedArr(newAreaSelectedArr)
        filterRegionsFromAreas(newAreaSelectedArr, true)
    }


    const handleAddressRemove = (e, idx) => {
        e.stopPropagation()
        var newAddressList = [...filter.addresses]
        newAddressList.splice(idx, 1)
        setFilter({ ...filter, addresses: newAddressList })
    }


    /**
     * Build array of areas
     */
    useEffect(() => {
        var listOfAreas = []

        mapArr.map((map) => {
            if (!listOfAreas.includes(map.area)) {
                listOfAreas.push(map.area)
            }
        })

        setAreasArr(listOfAreas)

    }, [mapArr])


    /**
     * Populate with filter data on page render
     */
    useEffect(() => {
        if (filter.userId === null && filterRendered === true) return
        setAreaSelectedArr(filter.selectedAreas)
        filterRegionsFromAreas(filter.selectedAreas, false)
        setFilterRendered(true)
    }, [filter])


    /**
     * Set graphic back to null if deselected from welcome comp
     */
    useEffect(() => {
        if (filter.addresses.length === 0) {
            setAreaSelectedArr([])
            setSelectionArr([])
        }
    }, [filter])


    return (
        <>
            <div className={`filter-box ${activeCondition && "selected"}`}>

                <FilterHeader
                    headerTitle={'Location'}
                    headerSubTitle={`${filter.addresses.length} addresses in your filter`}
                    activeCondition={filter.addresses.length && filter.addresses.length > 0}
                    onClick={() => { reveal === "LOCATION" ? setReveal("NONE") : setReveal("LOCATION"); window.scrollTo({ top: 172, behavior: 'smooth' }) }}
                    icon={locationIcon}
                />

                {reveal === "LOCATION" &&
                    <>

                        <div style={{ padding: "16px" }}>
                            <div style={{ height: "8px" }} />
                            <div
                                onClick={(e) => { e.stopPropagation(); view === "AREA" ? setView("ADDRESS") : setView("AREA") }}
                                style={{ width: "100%", textAlign: "center", border: "1px solid grey", display: "flex", borderRadius: "8px", overflow: "hidden" }}
                            >
                                <div style={{
                                    width: "50%",
                                    height: "100%",
                                    backgroundColor: view === "AREA" && "#00F2C4",
                                    padding: "16px",
                                    color: view === "AREA" && "black",
                                    cursor: "pointer"
                                }}>
                                    AREA
                                </div>

                                <div style={{
                                    width: "50%",
                                    height: "100%",
                                    backgroundColor: view === "ADDRESS" && "#00F2C4",
                                    padding: "16px",
                                    color: view === "ADDRESS" && "black",
                                    cursor: "pointer"
                                }}>
                                    ADDRESSES
                                </div>
                            </div>
                        </div>

                        {view === "AREA" && (
                            <>

                                <div style={{ height: "240px", margin: "-16px 0px 0px 16px", transform: "scale(0.16) translateY(-640px) translateX(-720px)" }}>
                                    {mapArr.map((map, idx) => {
                                        return (
                                            <div key={idx}>
                                                <svg width="1600px" height="1600px" style={{ position: "absolute" }}>
                                                    <g id={map.name} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" style={{ cursor: "pointer" }}>
                                                        <path d={map.path} id="Rectangle" stroke={selectionArr.indexOf(map.name) === -1 ? "#979797" : "black"} strokeWidth="4" fill={selectionArr.indexOf(map.name) === -1 ? "white" : "pink"}></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        )
                                    })}
                                </div>


                                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "16px" }}>
                                    {areasArr.map((area) => {
                                        return (
                                            <div
                                                key={area}
                                                onClick={(e) => { e.stopPropagation(); handleAreaSelection(area) }}
                                                style={{
                                                    backgroundColor: areaSelectedArr.indexOf(area) === -1 ? "white" : "#00F2C4",
                                                    width: "49%",
                                                    padding: "16px 4px",
                                                    border: "1px solid grey",
                                                    textAlign: "center",
                                                    marginTop: "6px",
                                                    borderRadius: "4px",
                                                    color: areaSelectedArr.indexOf(area) === -1 ? "grey" : "black",
                                                    cursor: "pointer",
                                                    fontSize: "12px"
                                                }}
                                            >
                                                <div>{area}</div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div style={{ height: "40px" }} />


                            </>
                        )}

                        {view === "ADDRESS" && (
                            <div style={{ padding: "8px" }}>

                                <h4>Addresses in your filter</h4>

                                {filter.addresses.length === 0 ? (
                                    <div>Select from the map to add addresses</div>
                                ) : (
                                    <div>Remove addresses in your filter by tapping them.</div>
                                )}


                                <div style={{ height: "24px" }} />

                                <div style={{ display: "flex", flexWrap: "wrap", height: "400px", overflow: "scroll" }}>
                                    {filter.addresses.map((address, idx) => {
                                        return (
                                            <div
                                                key={address}
                                                style={{
                                                    padding: "8px 16px",
                                                    backgroundColor: "black",
                                                    color: "white",
                                                    margin: "8px 8px 0px 0px",
                                                    fontSize: "12px",
                                                    borderRadius: "8px",
                                                    height: "30px",
                                                    cursor: "pointer"
                                                }}
                                                onClick={(e) => handleAddressRemove(e, idx)}
                                            >
                                                {address}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div style={{ height: "24px" }} />

                                <div
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setFilter({ ...filter, addresses: [] })
                                    }}
                                    style={{ width: "100%", textAlign: "center", padding: "16px", backgroundColor: "black", color: "white", cursor: "pointer" }}
                                >
                                    CLEAR ADDRESSES
                                </div>

                            </div>
                        )}
                    </>
                }
            </div>
        </>
    )

}

export default Location;