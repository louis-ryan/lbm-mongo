import InputHeader from "./InputHeader";

const Part3 = (props) => {

    const handleNextButton = {
        opacity: props.form.description ? "1" : "0.5",
        pointerEvents: props.form.description ? "inherit" : "none",
    }

    return (
        <>
            <div style={{ height: "16px" }} />

            {/* <InputHeader header={'Part 4/5: Description'} /> */}

            <h1>{'Part 4/6: Description'}</h1>

            <div style={{ height: "40px" }} />

            Please provide a detailed description of your property
            <textarea
                name='description'
                onChange={props.handleChange}
                value={props.form.description}
                style={{ border: "1px solid grey", width: "100%", resize: "none", fontFamily: "unset", fontSize: "24px" }}
            />

            <div style={{ height: "24px" }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div
                    className="button secondary"
                    onClick={() => props.setPart(2)}
                    style={{ width: "48%" }}
                >
                    Back
                </div>

                <div
                    className="button primary"
                    onClick={() => props.setPart(4)}
                    style={{ ...handleNextButton, width: "48%" }}
                >
                    Next
                </div>
            </div>

        </>
    )
}

export default Part3;