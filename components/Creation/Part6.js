import { useEffect } from 'react';


const Part6 = (props) => {


    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);



    return (
        <>
            <div style={{ height: "16px" }} />

            <h1>{'Review and Submit'}</h1>

            <div style={{ height: "40px" }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <h3>{'Address: '}</h3>
                <h3>{props.form.address}</h3>
            </div>

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <h3>{'Property type: '}</h3>
                <h3>{props.form.type}</h3>
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
                    onClick={() => props.setPart(6)}
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
        </>
    )
}

export default Part6;