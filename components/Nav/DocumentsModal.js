import { useEffect, useState } from "react"

const darkBackground = { width: "100vw", height: "calc(100vh + 4px)", zIndex: "600", marginTop: "-80px", opacity: "0.8", position: "fixed" }

const clickableContainer = { position: "absolute", top: "0px", width: "100vw", height: "100vh", zIndex: "601", marginTop: "-80px", display: "flex", justifyContent: "center", alignItems: "center" }
const infoBox = { width: "600px", backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0px 0px 40px darkgrey", position: "fixed" }


const ContactModal = ({ setDocumentsShowing, user }) => {

    const [overModal, setOverModal] = useState(false)



    return (
        <>
            <div style={darkBackground} />
            <div style={clickableContainer}
                onClick={() => { if (!overModal) { setDocumentsShowing(false) } }}
            >
                <div style={infoBox}
                    onMouseEnter={() => setOverModal(true)}
                    onMouseLeave={() => setOverModal(false)}
                >
                    <div
                        onClick={() => setDocumentsShowing(false)}
                        style={{ position: "absolute", marginLeft: "520px", marginTop: "-16px", cursor: "pointer" }}
                    >
                        X
                    </div>

                    <h2>{"Transfer Documents"}</h2>


                </div>
            </div>
        </>

    )

}


export default ContactModal;