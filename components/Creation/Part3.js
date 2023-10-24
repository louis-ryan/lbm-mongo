import { useEffect } from "react";
import NavButtons from "./NavButtons";

const Part3 = (props) => {

    const nextCondition = (
        props.form.description &&
        props.form.description.length <= 1000
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

            <h1>{'Part 6/8: Description'}</h1>

            <div style={{ height: "40px" }} />

            <h3>Please provide a detailed description of your property</h3>

            <div style={{ height: "24px" }} />

            <textarea
                name='description'
                onChange={props.handleChange}
                value={props.form.description}
                style={{ border: "1px solid grey", width: "100%", resize: "none", fontFamily: "unset", fontSize: "24px", height: "240px", border: props.errors.description && "2px solid #a57583" }}
            />

            {`${props.form.description ? props.form.description.length : "0"}/1000`}

            {props.errors.description && (
                <p style={{ background: "#a57583", color: "white", borderRadius: "4px", marginTop: "4px", padding: "8px" }}>
                    {props.errors.description}
                </p>
            )}

            <div style={{ height: "24px" }} />

            <NavButtons
                part={props.part}
                handleNextButton={handleNextButton}
                props={props}
            />
        </>
    )
}

export default Part3;