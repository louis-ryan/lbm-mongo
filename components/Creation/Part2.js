import { useState } from "react";
import InputHeader from "./InputHeader";

const Part2 = (props) => {

    const handleNextButton = {
        opacity: props.form.contractEnds && props.form.rent ? "1" : "0.5",
        pointerEvents: props.form.contractEnds && props.form.rent ? "inherit" : "none",
    }


    const [extensionPossible, setExtensionPossible] = useState("")
    const [readyToMove, setReadyToMove] = useState("")


    return (
        <>
            <div style={{ height: "16px" }} />

            <InputHeader header={'Part 3/5: Contract'} />

            <div>End of current contract</div>

            <input
                type="date"
                onChange={(e) => props.handleContractEnds(e.target.value)}
                style={{ width: "100%", fontFamily: "sans-serif", padding: "24px", fontSize: "24px" }}
            />

            <div style={{ height: "24px" }} />

            <div>Will it be possible for the new tennant to extend their contract after this time?</div>
            <div style={{ height: "8px" }} />
            <div style={{ fontSize: "12px" }}>{"(This is not binding but if there is no possiblity of renewal enter 'No')"}</div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "8px" }}>
                <div
                    onClick={() => {
                        setExtensionPossible("possible")
                        props.handleContractTerminates(false)
                    }}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: extensionPossible === "possible" ? "pink" : "lightgrey" }}
                >
                    Yes
                </div>
                <div
                    onClick={() => {
                        setExtensionPossible("not_possible")
                        props.handleContractTerminates(true)
                    }}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: extensionPossible === "not_possible" ? "pink" : "lightgrey" }}
                >
                    No
                </div>
            </div>

            <div style={{ height: "24px" }} />

            <div>Are you ready for a tennant to move in now?</div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "8px" }}>
                <div
                    onClick={() => {
                        setReadyToMove("ready")
                        let date = new Date();
                        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                        let formattedDate = date.toLocaleDateString('en-GB', options).split('/').reverse().join('-');
                        props.handleMoveInDate(formattedDate)
                    }}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: readyToMove === "ready" ? "pink" : "lightgrey" }}
                >
                    Yes
                </div>
                <div
                    onClick={() => setReadyToMove("not_ready")}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: readyToMove === "not_ready" ? "pink" : "lightgrey" }}
                >
                    No
                </div>
            </div>

            {readyToMove === "not_ready" && (
                <>
                    <div style={{ height: "24px" }} />

                    <div>Earliest possible move in date for new tennant</div>

                    <input
                        type="date"
                        onChange={(e) => props.handleMoveInDate(e.target.value)}
                        style={{ width: "100%", fontFamily: "sans-serif", padding: "24px", fontSize: "24px" }}
                    />
                </>
            )}


            <div style={{ height: "40px" }} />

            <div>Rent Calculated Weekly</div>
            <div className="rent-input">
                <div style={{ fontSize: "32px", margin: "24px 8px 0px 0px" }}>$</div>
                <input
                    className="rent-field"
                    value={props.form.rent === 0 ? '' : props.form.rent}
                    placeholder='0'
                    control='input'
                    name='rent'
                    type='number'
                    onChange={props.handleRent}
                    style={{ width: "100%", fontSize: "32px", height: "80px", border: "none" }}
                />
                <div style={{ fontSize: "32px", margin: "24px 0px 0px 8px" }}>AUD</div>
            </div>

            <div style={{ height: "40px" }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div
                    className="button secondary"
                    onClick={() => props.setPart(1)}
                    style={{ width: "48%" }}
                >
                    Back
                </div>

                <div
                    className="button primary"
                    onClick={() => props.setPart(3)}
                    style={{ ...handleNextButton, width: "48%" }}
                >
                    Next
                </div>
            </div>

        </>
    )
}

export default Part2;