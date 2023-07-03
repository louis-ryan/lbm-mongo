import Logo from './Logo'

const WelcomeComp = ({ user, filter, setFilter, deviceSize }) => {

    const labelStyle = { padding: "8px 32px 4px 16px", borderRadius: "8px", margin: "8px 8px 0px 0px", cursor: "pointer", border: "black 4px solid", backgroundColor: "white", color: "black" }

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


    if (deviceSize === "DESKTOP") {
        return (
            <div style={{ width: "100%", borderRadius: "8px", color: "white" }}>
                <div style={{ height: "60px" }} />
                <div style={{ fontSize: "32px" }}>Welcome {user && user.given_name}</div>
                <div style={{ height: "40px" }} />
                {/* <div style={{ fontSize: "16px" }}>You are filtering by the following options...</div>
                <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap" }}>

                    {labelsArr.map((label) => (
                        <div
                            key={label.name}
                            onClick={() => setFilter(label.newFilter)}
                            style={{ ...labelStyle, display: !label.condition ? "none" : "flex" }}
                        >
                            <div>
                                <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ height: "20px" }}>
                                    <g id="Delete" stroke="none" strokeWidth="2" fillRule="evenodd">
                                        <line x1="14.1585366" y1="14.1463415" x2="26.8414634" y2="25.8536585" id="Line" stroke="#FFFFFF" strokeLinecap="square"></line>
                                        <line x1="25.8589744" y1="14.1463415" x2="15.1410256" y2="25.8536585" id="Line-20" stroke="#FFFFFF" strokeLinecap="square"></line>
                                        <circle id="Oval" stroke="#FFFFFF" fill="black" cx="20.5" cy="19.5" r="15"></circle>
                                    </g>
                                </svg>
                            </div>
                            <div>{label.name}</div>
                        </div>
                    ))}
                </div> */}
            </div>
        )
    } else {
        return (
            <div style={{ width: "100%", padding: "16px", backgroundColor: "white", border: "1px solid grey", borderRadius: "8px" }}>
                <Logo />
                <div style={{ height: "16px" }} />
                <div style={{ fontSize: "32px" }}>Welcome {user && user.given_name}</div>
                <div style={{ height: "24px" }} />
                <div style={{ fontSize: "16px" }}>You are filtering by the following options...</div>
                <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap" }}>

                    {labelsArr.map((label) => (
                        <div
                            key={label.name}
                            onClick={() => setFilter(label.newFilter)}
                            style={{ ...labelStyle, display: !label.condition ? "none" : "flex" }}
                        >
                            <div>
                                <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ height: "20px", filter: "invert(1)" }}>
                                    <g id="Delete" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
                                        <line x1="14.1585366" y1="14.1463415" x2="26.8414634" y2="25.8536585" id="Line" stroke="#FFFFFF" strokeLinecap="square"></line>
                                        <line x1="25.8589744" y1="14.1463415" x2="15.1410256" y2="25.8536585" id="Line-20" stroke="#FFFFFF" strokeLinecap="square"></line>
                                        <circle id="Oval" stroke="#FFFFFF" cx="20.5" cy="19.5" r="15"></circle>
                                    </g>
                                </svg>
                            </div>
                            <div>{label.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }


}

export default WelcomeComp;