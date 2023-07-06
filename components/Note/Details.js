import mapPath from './MapPath';


const itemStyle = { border: "1px solid grey", borderRadius: "8px", padding: "16px", marginBottom: "16px" }


const Details = ({ note, mapPath, latInPx, longInPx }) => {


    const getFormattedDate = (unformattedDate) => {
        var date = new Date(unformattedDate);
        var day = String(date.getUTCDate()).padStart(2, '0');
        var month = String(date.getUTCMonth() + 1).padStart(2, '0');
        var year = date.getUTCFullYear();
        var formattedDate = day + "/" + month + "/" + year;

        return formattedDate
    }


    const getTimeRemaining = (earlier, later) => {
        var diffMs = later - earlier;

        var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        var diffYears = Math.floor(diffDays / 365.25);
        diffDays -= diffYears * 365.25;
        var diffMonths = Math.floor(diffDays / 30.44);
        diffDays -= diffMonths * 30.44;

        diffDays = Math.round(diffDays);

        var diffString = "";
        if (diffYears > 0) {
            diffString += diffYears + " year(s), ";
        }
        if (diffMonths > 0) {
            diffString += diffMonths + " month(s), ";
        }
        diffString += diffDays + " day(s)";

        return diffString
    }


    return (
        <div style={{ padding: "8px", backgroundColor: "white" }} >

            <div style={{ ...itemStyle, display: "flex", overflow: "hidden" }}>

                <div style={{width: "50%"}}>
                    <h3>{"Property Location:"}</h3>
                    <h2>{note.address}, VIC</h2>
                </div>

                <div style={{
                    transform: "scale(0.12) translateY(-600px) translateX(-600px)",
                    height: "180px",
                    width: "50%"
                }}>

                    <svg width="1600px" height="1600px">
                        <g id="Artboard-Copy-8" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.607136805">
                            <path d={mapPath} id="Rectangle" stroke="#979797" strokeWidth="4" fill="#D8D8D8"></path>
                        </g>
                    </svg>

                    <div style={{ position: "absolute", width: "1600px", height: "1600px", zIndex: "20", marginTop: "-1600px" }}>
                        <div style={{ width: "120px", height: "120px", backgroundColor: "black", marginLeft: `${longInPx - 120}px`, marginTop: `${latInPx - 120}px`, borderRadius: "50%", border: "1px solid grey" }}></div>
                    </div>


                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ ...itemStyle, width: "49%" }}>
                    <h3>{"Contract Ends:"}</h3>
                    <h2>{getFormattedDate(note.contractEnds)}</h2>
                    <p>{`${getTimeRemaining(new Date(), new Date(note.contractEnds))} remain on this contract`}</p>
                </div>

                <div style={{ ...itemStyle, width: "49%" }}>
                    <h3>{"Earliest Possible Move-in:"}</h3>
                    {new Date(note.moveInDate) > new Date() ? (
                        <>
                            <h2>{getFormattedDate(note.moveInDate)}</h2>
                            <p>{`${getTimeRemaining(new Date(note.moveInDate), new Date(note.contractEnds))} before possible contract renewal`}</p>
                        </>
                    ) : (
                        <>
                            <h2>{"Ready to move in!"}</h2>
                            <p>{`${getTimeRemaining(new Date(), new Date(note.contractEnds))} before possible contract renewal`}</p>
                        </>
                    )}
                </div>
            </div>

            {note.contractTerminates ? (
                <div style={{ borderRadius: "8px", padding: "16px", marginBottom: "16px", backgroundColor: "red" }}>
                    <h3 style={{ color: "white" }}>
                        {"It will not be possible to renew this contract after the initial lease period"}
                    </h3>
                </div>
            ) : (
                <div style={{ borderRadius: "8px", padding: "16px", marginBottom: "16px", backgroundColor: "green" }}>
                    <h3 style={{ color: "white" }}>
                        {"After the initial lease period you will have the chance to renew this contract!"}
                    </h3>
                </div>
            )}

            <div style={itemStyle}>
                <h3>{"Description:"}</h3>
                <h3>{note.description}</h3>
            </div>
        </div>
    )
}

export default Details;