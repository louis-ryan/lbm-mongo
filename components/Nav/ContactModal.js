import { useState } from "react"

const darkBackground = { width: "100vw", height: "calc(100vh + 4px)", zIndex: "600", backgroundColor: "black", marginTop: "-80px", opacity: "0.8" }

const clickableContainer = { position: "absolute", top: "0px", width: "100vw", height: "100vh", zIndex: "601", marginTop: "-80px", display: "flex", justifyContent: "center", alignItems: "center" }
const infoBox = { width: "600px", backgroundColor: "white", padding: "40px", borderRadius: "16px", height: "600px" }
const contactRow = { display: "flex", width: "100%", justifyContent: "space-between", height: "80px", alignItems: "center" }


const ContactModal = ({ setContactShowing, user }) => {

    const [overModal, setOverModal] = useState(false)

    return (
        <>
            <div style={darkBackground} />
            <div style={clickableContainer}
                onClick={() => { if (!overModal) { setContactShowing(false) } }}
            >
                <div style={infoBox}
                    onMouseEnter={() => setOverModal(true)}
                    onMouseLeave={() => setOverModal(false)}
                >
                    <h2>{"Contact Information"}</h2>

                    <div style={contactRow}>
                        <div style={{ width: "30%" }}>{"PHONE: "}</div>
                        <input style={{ width: "70%" }} />
                    </div>

                    <div style={contactRow}>
                        <div style={{ width: "30%" }}>{"EMAIL: "}</div>
                        <div style={{ width: "70%" }}>{user.email}</div>
                    </div>

                </div>
            </div>
        </>

    )

}


export default ContactModal;