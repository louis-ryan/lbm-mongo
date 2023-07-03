
const BrowseOptions = ({ unlimitedNotes, skipping, setSkipping, getSkippedNotes }) => {

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "8px" }}>

            <div>  Viewing {skipping + 1} to {skipping + 5 > unlimitedNotes ? unlimitedNotes : skipping + 5} of {unlimitedNotes} </div>

            <div
                className="browse-button"
                onClick={() => {
                    if (skipping === 0) return
                    setSkipping(skipping - 5)
                    getSkippedNotes(skipping - 5)
                }}
            >
                PREV
            </div>

            <div
                className="browse-button"
                onClick={() => {
                    if (skipping + 5 >= unlimitedNotes) return
                    setSkipping(skipping + 5)
                    getSkippedNotes(skipping + 5)
                }}
            >
                NEXT
            </div>
        </div>
    )

}

export default BrowseOptions;