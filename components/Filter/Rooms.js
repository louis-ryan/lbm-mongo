import FilterHeader from "./FilterHeader";


const Rooms = ({ reveal, setReveal, deviceSize, filter, setFilter }) => {

    const activeCondition = (filter.minBed > 0 || filter.minBath > 0)

    const handleChange = (e, room) => {
        if (e.target.value) {
            setFilter({ ...filter, [room]: parseInt(e.target.value) })
        } else {
            setFilter({ ...filter, [room]: 0 })
        }
    }


    return (
        <>
            <div
                className="filter-box"
                style={{ border: activeCondition ? "#50554A 4px solid" : "2px solid #50554A" }}
            >

                <FilterHeader
                    headerTitle={'Rooms'}
                    headerSubTitle={`living/bed: ${filter.minBed} bath:  ${filter.minBath}`}
                    activeCondition={activeCondition}
                    onClick={() => reveal === "ROOMS" ? setReveal("NONE") : setReveal("ROOMS")}
                    icon={
                        <g id="Rooms" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M32.5,31.5 L7.5,31.5 L7.5,22 C7.5,21.5857864 7.66789322,21.2107864 7.93933983,20.9393398 C8.21078644,20.6678932 8.58578644,20.5 9,20.5 L20,20.5 L31,20.5 C31.4142136,20.5 31.7892136,20.6678932 32.0606602,20.9393398 C32.3321068,21.2107864 32.5,21.5857864 32.5,22 L32.5,31.5 Z" id="Rectangle" stroke="#979797"></path>
                            <path d="M7.5,18 L7.5,32 L4,32.5 L3.5,18 C3.5,17.5857864 3.66789322,17.2107864 3.93933983,16.9393398 C4.21078644,16.6678932 4.58578644,16.5 5,16.5 L6,16.5 C6.41421356,16.5 6.78921356,16.6678932 7.06066017,16.9393398 C7.33210678,17.2107864 7.5,17.5857864 7.5,18 Z" id="Rectangle" stroke="#979797"></path>
                            <path d="M31.5,20.5 L8.5,20.5 L8.5,15 C8.5,13.4812169 9.11560847,12.1062169 10.1109127,11.1109127 C11.1062169,10.1156085 12.4812169,9.5 14,9.5 L26,9.5 C27.5187831,9.5 28.8937831,10.1156085 29.8890873,11.1109127 C30.8843915,12.1062169 31.5,13.4812169 31.5,15 L31.5,20.5 Z" id="Rectangle" stroke="#979797"></path>
                            <rect id="Rectangle" stroke="#979797" x="4.5" y="32.5" width="2" height="2"></rect>
                            <rect id="Rectangle-Copy-3" stroke="#979797" x="8.5" y="31.5" width="2" height="2"></rect>
                            <rect id="Rectangle-Copy-4" stroke="#979797" x="29.5" y="31.5" width="2" height="2"></rect>
                            <rect id="Rectangle-Copy-2" stroke="#979797" x="33.5" y="32.5" width="2" height="2"></rect>
                            <path d="M36.5,18 L36.5,32 L33,32.5 L32.5,18 C32.5,17.5857864 32.6678932,17.2107864 32.9393398,16.9393398 C33.2107864,16.6678932 33.5857864,16.5 34,16.5 L35,16.5 C35.4142136,16.5 35.7892136,16.6678932 36.0606602,16.9393398 C36.3321068,17.2107864 36.5,17.5857864 36.5,18 Z" id="Rectangle-Copy" stroke="#979797"></path>
                            <path d="M12,24 C14.6666667,23.3333333 17.3333333,23 20,23 C22.6666667,23 25.3333333,23.3333333 28,24" id="Line-14" stroke="#979797" strokeLinecap="round"></path>
                            <line x1="10.5" y1="16.5" x2="10.5" y2="20.5" id="Line-15" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="29.5" y1="16.5" x2="29.5" y2="20.5" id="Line-15-Copy" stroke="#979797" strokeLinecap="square"></line>
                        </g>
                    }

                />

                {reveal === "ROOMS" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "48%" }}>
                                    Min number of Bed/Livingrooms
                                    <input
                                        value={filter.minBed > 0 ? filter.minBed : ''}
                                        onChange={(e) => handleChange(e, 'minBed')}
                                        style={{ padding: "24px 8px", width: "100%", fontSize: "24px" }}
                                    />
                                </div>
                                <div style={{ width: "48%" }}>
                                    Min number of Bathrooms
                                    <input
                                        value={filter.minBath > 0 ? filter.minBath : ''}
                                        onChange={(e) => handleChange(e, 'minBath')}
                                        style={{ padding: "24px 8px", width: "100%", fontSize: "24px" }}
                                    />
                                </div>
                            </div>

                            <div style={{ height: "40px" }} />
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default Rooms;