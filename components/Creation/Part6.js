import { useState, useEffect } from 'react';


const Part6 = (props) => {

    const [submitFormView, setSubmitFormView] = useState("NONE")


    console.log("form: ", props.form)

    const tenSecondTimer = () => {
        setTimeout(function () {
            setSubmitFormView("SUBMIT")
        }, 10000)
    }


    useEffect(() => {
        tenSecondTimer()
        setSubmitFormView("PROMO")
    }, [])


    if (submitFormView !== "SUBMIT") {
        return (
            <>
                <div style={{ width: "100%", height: "600px", backgroundColor: "grey", borderRadius: "8px" }}>



                </div>
                <div style={{ height: "8px", width: submitFormView === "NONE" ? "0%" : "100%", backgroundColor: "blue", transition: "linear 10s", borderRadius: "8px", marginTop: "4px" }} />
            </>

        )
    } else {
        return (
            <div style={{ padding: "80px" }}>
                <div style={{ height: "16px" }} />

                <h1>{'Review and Submit'}</h1>

                <div style={{ height: "40px" }} />

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Address: '}</h3>
                    <h3>{props.form.address}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Rent: '}</h3>
                    <h3>{`$${props.form.rent}.00 pw`}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Number of bed/living rooms: '}</h3>
                    <h3>{props.form.numRoom}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Number of bathrooms: '}</h3>
                    <h3>{props.form.numBath}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'End of contract: '}</h3>
                    <h3>{props.form.contractEnds}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'With possibility to renew? '}</h3>
                    <h3>{props.form.contractTerminates ? "No" : "Yes"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Earliest date for move-in: '}</h3>
                    <h3>{props.form.moveInDate}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Is there a garden? '}</h3>
                    <h3>{props.form.garden ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Is there an outdoor terrace? '}</h3>
                    <h3>{props.form.outdoorArea ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Is there a parking space? '}</h3>
                    <h3>{props.form.parkingSpace ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Are pets allowed? '}</h3>
                    <h3>{props.form.petsAllowed ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Do you share a wall with a neighbour? '}</h3>
                    <h3>{props.form.sharingWall ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Do you share a floor or ceiling with a neighbour? '}</h3>
                    <h3>{props.form.sharingFloor ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Is it less than 1km to the nearest trainstation? '}</h3>
                    <h3>{props.form.trainstation ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{'Is it less than 1km to the nearest supermarket? '}</h3>
                    <h3>{props.form.supermarket ? "Yes" : "No"}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <h3>{`You have attached ${props.form.pics?.length} photo(s) to this property`}</h3>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div
                        className="button secondary"
                        onClick={() => props.setPart(5)}
                        style={{ width: "48%" }}
                    >
                        Back
                    </div>

                    <div
                        className="button primary"
                        onClick={() => props.handleSubmit()}
                        style={{ width: "48%" }}
                    >
                        Submit Property
                    </div>
                </div>
            </div>
        )
    }

}

export default Part6;