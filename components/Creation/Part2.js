import { useState, useEffect } from "react";
import NavButtons from "./NavButtons";


const Part2 = (props) => {


    const [readyToMove, setReadyToMove] = useState("")


    let date = new Date();
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = date.toLocaleDateString('en-GB', options).split('/').reverse().join('-');


    const nextCondition = (
        props.form.contractEnds &&
        props.form.moveInDate &&
        !props.errors.contractEnds &&
        !props.errors.moveInDate
    )

    const handleNextButton = {
        opacity: nextCondition ? "1" : "0.5",
        pointerEvents: nextCondition ? "inherit" : "none",
    }

    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    useEffect(() => {
        if (!props.form.moveInDate) return
        if (formattedDate === props.form.moveInDate) {
            setReadyToMove("ready")
        } else {
            setReadyToMove("not_ready")
        }
    }, [])


    return (
        <>
            <div style={{ height: "16px" }} />

            <h1>{'Part 4/8: Dates'}</h1>

            <div style={{ height: "40px" }} />

            <h3>End of current contract</h3>

            <input
                type="date"
                onChange={(e) => props.handleContractEnds(e.target.value)}
                value={props.form.contractEnds}
                style={{ width: "100%", fontFamily: "sans-serif", padding: "24px", fontSize: "24px", border: props.errors.contractEnds && "2px solid #a57583" }}
            />

            {props.errors.contractEnds && (
                <p style={{ background: "#a57583", color: "white", borderRadius: "4px", marginTop: "4px", padding: "8px" }}>
                    {props.errors.contractEnds}
                </p>
            )}

            <div style={{ height: "24px" }} />

            <h3>Will it be possible for the new tennant to extend their contract after this time?</h3>

            <div style={{ height: "8px" }} />
            <div style={{ fontSize: "12px" }}>{"(This is not binding but if there is no possiblity of renewal enter 'No')"}</div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "8px" }}>
                <div
                    onClick={() => props.handleContractTerminates(false)}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: !props.form.contractTerminates ? "#00F2C4" : "lightgrey", color: !props.form.contractTerminates && "black" }}
                >
                    Yes
                </div>
                <div
                    onClick={() => props.handleContractTerminates(true)}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: props.form.contractTerminates ? "#00F2C4" : "lightgrey", color: props.form.contractTerminates && "black" }}
                >
                    No
                </div>
            </div>

            <div style={{ height: "24px" }} />

            <h3>Are you ready for a tennant to move in now?</h3>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "8px" }}>
                <div
                    onClick={() => {
                        setReadyToMove("ready")
                        props.handleMoveInDate(formattedDate)
                    }}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: readyToMove === "ready" ? "#00F2C4" : "lightgrey", color: readyToMove === "ready" && "black" }}
                >
                    Yes
                </div>
                <div
                    onClick={() => {
                        setReadyToMove("not_ready")
                        props.handleMoveInDate("")
                    }}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", height: "80px", width: "49%", backgroundColor: readyToMove === "not_ready" ? "#00F2C4" : "lightgrey", color: readyToMove === "not_ready" && "black" }}
                >
                    No
                </div>
            </div>

            {readyToMove === "not_ready" && (
                <>
                    <div style={{ height: "24px" }} />

                    <h3>Earliest possible move in date for new tennant</h3>

                    <input
                        type="date"
                        onChange={(e) => props.handleMoveInDate(e.target.value)}
                        value={props.form.moveInDate}
                        style={{ width: "100%", fontFamily: "sans-serif", padding: "24px", fontSize: "24px", border: props.errors.moveInDate && "2px solid #a57583" }}
                    />

                    {props.errors.moveInDate && (
                        <p style={{ background: "#a57583", color: "white", borderRadius: "4px", marginTop: "4px", padding: "8px" }}>
                            {props.errors.moveInDate}
                        </p>
                    )}
                </>
            )}

            <div style={{ height: "40px" }} />

            <NavButtons
                part={props.part}
                handleNextButton={handleNextButton}
                props={props}
            />
        </>
    )
}

export default Part2;