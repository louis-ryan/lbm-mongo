
const BrowseOptions = ({ unlimitedNotes, skipping, setSkipping, getSkippedNotes, deviceSize }) => {

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "8px", fontSize: deviceSize === "MOBILE" && "20px" }}>

            {deviceSize === "DESKTOP" && (
                <div style={{ fontWeight: "600" }}>  Viewing {skipping + 1} to {skipping + 5 > unlimitedNotes ? unlimitedNotes : skipping + 5} of {unlimitedNotes} </div>
            )}

            {skipping === 0 ? (
                <div style={{ display: "flex", fontWeight: "600", opacity: "0.5", pointerEvents: "none" }}>
                    <div style={{ transform: "rotate(270deg)" }}>{"∆"}</div>
                    <div style={{ width: "8px" }} />
                    <div>{"Prev"}</div>
                </div>
            ) : (
                <div
                    className="browse-button"
                    onClick={() => { 
                        setSkipping(skipping - 5); getSkippedNotes(skipping - 5) 
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ display: "flex" }}
                >
                    <div style={{ transform: "rotate(270deg)" }}>{"∆"}</div>
                    <div style={{ width: "8px" }} />
                    <div>{"Prev"}</div>
                </div>
            )}


            {skipping + 5 >= unlimitedNotes ? (
                <div style={{ display: "flex", fontWeight: "600", opacity: "0.5", pointerEvents: "none" }}>
                    <div>{"Next"}</div>
                    <div style={{ width: "8px" }} />
                    <div style={{ transform: "rotate(90deg)" }}>{"∆"}</div>
                </div>
            ) : (
                <div
                    className="browse-button"
                    onClick={() => { 
                        setSkipping(skipping + 5); getSkippedNotes(skipping + 5) 
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ display: "flex" }}
                >
                    <div>{"Next"}</div>
                    <div style={{ width: "8px" }} />
                    <div style={{ transform: "rotate(90deg)" }}>{"∆"}</div>
                </div>
            )}

        </div>
    )
}

export default BrowseOptions;