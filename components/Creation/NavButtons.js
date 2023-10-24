const NavButtons = ({ handleNextButton, part, props }) => {


    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div
                className="button secondary"
                onClick={() => props.setPart(part - 1)}
                style={{ width: "48%" }}
            >
                Back
            </div>

            <div
                className="button primary"
                onClick={() => props.setPart(part + 1)}
                style={{ ...handleNextButton, width: "48%" }}
            >
                Next
            </div>
        </div>
    )
}

export default NavButtons;