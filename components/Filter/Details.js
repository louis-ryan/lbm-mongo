import FilterHeader from "./FilterHeader";


const Rooms = ({ reveal, setReveal, deviceSize, filter, setFilter }) => {

    const activeCondition = (filter.petsAllowed || filter.parkingSpace || filter.terrace || filter.garden || filter.noSharedWalls || filter.noSharedFloor || filter.walkToSupermarket || filter.walkToTrain)

    const detailStyle = { width: "100%", padding: "8px 0px", textAlign: "center", border: "1px solid grey", marginBottom: "4px", cursor: "pointer" }

    const boolArray = [
        { name: 'Pets allowed', var: 'petsAllowed' },
        { name: 'Parking space', var: 'parkingSpace' },
        { name: 'Outdoor terrace', var: 'terrace' },
        { name: 'Garden', var: 'garden' },
        { name: 'No shared walls', var: 'noSharedWalls' },
        { name: 'No shared floor or ceiling', var: 'noSharedFloor' },
        { name: 'Supermarket within 1km', var: 'walkToSupermarket' },
        { name: 'Trainstation within 1km', var: 'walkToTrain' }
    ]

    const getHeaderSubtitle = () => {
        var activeDetails = []
        boolArray.map((bool) => {
            if (!filter[bool.var]) return
            activeDetails.push(bool.var)
        })
        return `Filtering by ${activeDetails.length} detail${activeDetails.length !== 1 ? 's' : ''}`

    }



    return (
        <>
            <div
                className="filter-box"
                style={{ border: activeCondition ? "#50554A 4px solid" : "2px solid #50554A" }}
            >

                <FilterHeader
                    headerTitle={'Details'}
                    headerSubTitle={getHeaderSubtitle()}
                    activeCondition={activeCondition}
                    onClick={() => reveal === "DETAILS" ? setReveal("NONE") : setReveal("DETAILS")}
                    icon={
                        <g id="Details" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <circle id="Oval" stroke="#979797" cx="6" cy="9" r="2.5"></circle>
                            <circle id="Oval-Copy" stroke="#979797" cx="6" cy="20" r="2.5"></circle>
                            <circle id="Oval-Copy-2" stroke="#979797" cx="6" cy="31" r="2.5"></circle>
                            <rect id="Rectangle" stroke="#979797" x="13.5" y="7.5" width="22" height="3" rx="1.5"></rect>
                            <rect id="Rectangle-Copy" stroke="#979797" x="13.5" y="18.5" width="22" height="3" rx="1.5"></rect>
                            <rect id="Rectangle-Copy-2" stroke="#979797" x="13.5" y="29.5" width="22" height="3" rx="1.5"></rect>
                        </g>
                    }

                />

                {reveal === "DETAILS" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            Property must have...

                            <div style={{ height: "24px" }} />

                            {boolArray.map((bool) => (
                                <div
                                    key={bool.var}
                                    onClick={() =>
                                        setFilter(() =>
                                            filter[bool.var] ?
                                                { ...filter, [bool.var]: false } :
                                                { ...filter, [bool.var]: true }
                                        )}
                                    style={{
                                        ...detailStyle,
                                        backgroundColor: filter[bool.var] && "#00F2C4",
                                        color: filter[bool.var] && "black"
                                    }}
                                >
                                    {bool.name}
                                </div>
                            ))}

                            <div style={{ height: "40px" }} />
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default Rooms;