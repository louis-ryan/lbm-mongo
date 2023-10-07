
const BrowseOptions = ({ unlimitedNotes, skipping, setSkipping, getSkippedNotes, deviceSize }) => {

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "8px", fontSize: deviceSize === "MOBILE" && "20px" }}>

            {deviceSize === "DESKTOP" && (
                <div>  Viewing {skipping + 1} to {skipping + 5 > unlimitedNotes ? unlimitedNotes : skipping + 5} of {unlimitedNotes} </div>
            )}

            <div
                className="browse-button"
                onClick={() => {
                    if (skipping === 0) return
                    setSkipping(skipping - 5)
                    getSkippedNotes(skipping - 5)
                }}
                style={{ display: "flex" }}
            >
                <div style={{ transform: "rotate(270deg)" }}>{"∆"}</div>
                <div style={{ width: "8px" }} />
                <div>{"Prev"}</div>
            </div>

            <div
                className="browse-button"
                onClick={() => {
                    if (skipping + 5 >= unlimitedNotes) return
                    setSkipping(skipping + 5)
                    getSkippedNotes(skipping + 5)
                }}
                style={{ display: "flex" }}
            >
                <div>{"Next"}</div>
                <div style={{ width: "8px" }} />
                <div style={{ transform: "rotate(90deg)" }}>{"∆"}</div>
            </div>
        </div>
    )
}

export default BrowseOptions;