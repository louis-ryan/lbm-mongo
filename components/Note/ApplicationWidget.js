const ApplicationWidget = ({ contactDetails, setApplyModal }) => {

    return (
        <div style={{ backgroundColor: "white", position: "fixed", top: "80px", left: "24px", padding: "16px", borderRadius: "8px", textAlign: "center" }}>

            <div onClick={() => setApplyModal(true)} style={{ width: "100%", padding: "16px", backgroundColor: "#00F2C4", color: "black", borderRadius: "4px", fontWeight: "800" }}>
                {"Apply directly for this property"}
            </div>

            <div style={{ height: "8px" }} />

            <div>{"or"}</div>

            <div style={{ height: "8px" }} />

            <div style={{ width: "100%", padding: "16px", border: "1px solid black", color: "black", borderRadius: "4px", fontWeight: "800" }}>
                {"Reveal contact details of lister"}
            </div>

            <div style={{ height: "8px" }} />

            <div style={{ textAlign: "left" }}>
                <div>{"This user is has listed:"}</div>

                <div style={{ height: "8px" }} />

                {contactDetails.phone && (<div>{"- Phone number"}</div>)}
                {contactDetails.email && (<div>{"- Email"}</div>)}
                {contactDetails.social && (<div>{"- Facebook"}</div>)}
            </div>
        </div>
    )

}

export default ApplicationWidget;