import FilterHeader from "./FilterHeader";


const MoveIn = ({ reveal, setReveal, deviceSize, filter, setFilter }) => {

    const activeCondition = (filter.moveInEarliest || filter.moveInLatest)

    const headerSubTitle = (
        `${filter.moveInEarliest ? 'earliest possible' : ''}` +
        `${filter.moveInEarliest && filter.moveInLatest ? ' and ' : ' '}` +
        `${filter.moveInLatest ? 'latest possible' : ''}`
    )

    const handleValue = (event) => {
        if (!filter[event]) {
            return ''
        }
        if (filter[event].includes('T')) {
            const formattedDate = filter[event].split('T')
            return formattedDate[0]
        } else {
            return filter[event]
        }
    }


    return (
        <>
            <div
                className="filter-box"
                style={{ border: activeCondition ? "#50554A 4px solid" : "2px solid #50554A" }}
            >

                <FilterHeader
                    headerTitle={'Move in'}
                    headerSubTitle={headerSubTitle}
                    activeCondition={activeCondition}
                    onClick={() => reveal === "MOVEIN" ? setReveal("NONE") : setReveal("MOVEIN")}
                    icon={
                        <g id="Move-In" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M34.5,35.5 L14,35.5 C11.6527898,35.5 9.52778981,34.5486051 7.98959236,33.0104076 C6.45139491,31.4722102 5.5,29.3472102 5.5,27 L5.5,7.5 L9.5,7.5 L9.5,10.5 L12.5,10.5 L12.5,7.5 L27.5,7.5 L27.5,10.5 L30.5,10.5 L30.5,7.5 L34.5,7.5 L34.5,35.5 Z" id="Rectangle" stroke="#979797"></path>
                            <rect id="Rectangle" stroke="#979797" x="9.5" y="4.5" width="3" height="6"></rect>
                            <rect id="Rectangle-Copy" stroke="#979797" x="27.5" y="4.5" width="3" height="6"></rect>
                            <path d="M31.5,32.5 L14.5,32.5 L14.5,27.5 L8.5,27.5 L8.5,14.5 L31.5,14.5 L31.5,32.5 Z" id="Rectangle" stroke="#979797"></path>
                            <rect id="Rectangle" stroke="#979797" x="13.5" y="14.5" width="6" height="6"></rect>
                            <path d="M19.5,32.5 L14.5,32.5 L14.5,27.5 L13.5,27.5 L13.5,25.5 L19.5,25.5 L19.5,32.5 Z" id="Rectangle-Copy-5" stroke="#979797"></path>
                            <rect id="Rectangle-Copy-2" stroke="#979797" x="19.5" y="20.5" width="6" height="5"></rect>
                            <rect id="Rectangle-Copy-3" stroke="#979797" x="8.5" y="20.5" width="5" height="5"></rect>
                            <rect id="Rectangle-Copy-4" stroke="#979797" x="25.5" y="14.5" width="6" height="6"></rect>
                            <rect id="Rectangle-Copy-6" stroke="#979797" x="25.5" y="25.5" width="6" height="7"></rect>
                            <line x1="5.5" y1="27.5" x2="12.5" y2="27.5" id="Line-16" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="14.5" y1="35.5" x2="14.5" y2="27.5" id="Line" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="21.5" y1="16.5" x2="23.5" y2="18.5" id="Line-17" stroke="#979797" strokeLinecap="round"></line>
                            <line x1="21.5" y1="18.5" x2="23.5" y2="16.5" id="Line-2" stroke="#979797" strokeLinecap="round"></line>
                            <line x1="15.5" y1="16.5" x2="17.5" y2="18.5" id="Line-18" stroke="#979797" strokeLinecap="round"></line>
                            <line x1="15.5" y1="18.5" x2="17.5" y2="16.5" id="Line-3" stroke="#979797" strokeLinecap="round"></line>
                            <line x1="9.5" y1="16.5" x2="11.5" y2="18.5" id="Line-19" stroke="#979797" strokeLinecap="round"></line>
                            <line x1="9.5" y1="18.5" x2="11.5" y2="16.5" id="Line-4" stroke="#979797" strokeLinecap="round"></line>
                        </g>
                    }

                />

                {reveal === "MOVEIN" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            Earliest move-in date
                            <input
                                type="date"
                                value={handleValue('moveInEarliest')}
                                onChange={(e) => setFilter({ ...filter, moveInEarliest: e.target.value })}
                                style={{ width: "100%", fontFamily: "sans-serif", padding: "16px", fontSize: "24px" }}
                            />

                            <div style={{ height: "24px" }} />

                            Latest move-in date
                            <input
                                type="date"
                                value={handleValue('moveInLatest')}
                                onChange={(e) => setFilter({ ...filter, moveInLatest: e.target.value })}
                                style={{ width: "100%", fontFamily: "sans-serif", padding: "16px", fontSize: "24px" }}
                            />

                            <div style={{ height: "40px" }} />
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default MoveIn;