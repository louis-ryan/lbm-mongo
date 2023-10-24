import { useState, useEffect } from "react";
import NavButtons from "./NavButtons";


const Part2 = (props) => {


    const [extensionPossible, setExtensionPossible] = useState("")
    const [readyToMove, setReadyToMove] = useState("")


    const nextCondition = (
        props.form.contractEnds &&
        props.form.rent &&
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


    return (
        <>
            <div style={{ height: "16px" }} />

            <h1>{'Part 5/8: Rent'}</h1>

            <div style={{ height: "40px" }} />

            <h3>Rent Calculated Weekly</h3>
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

            <h3>Bond</h3>
            <div style={{ fontSize: "12px" }}>{"(Leave as 0 if there is no bond to be paid)"}</div>
            <div className="rent-input">
                <div style={{ fontSize: "32px", margin: "24px 8px 0px 0px" }}>$</div>
                <input
                    className="rent-field"
                    value={props.form.rent === 0 ? '' : props.form.bond}
                    placeholder='0'
                    control='input'
                    name='bond'
                    type='number'
                    onChange={props.handleRent}
                    style={{ width: "100%", fontSize: "32px", height: "80px", border: "none" }}
                />
                <div style={{ fontSize: "32px", margin: "24px 0px 0px 8px" }}>AUD</div>
            </div>

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