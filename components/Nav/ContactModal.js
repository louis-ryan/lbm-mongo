import { useEffect, useState } from "react"

const darkBackground = { width: "100vw", height: "calc(100vh + 4px)", zIndex: "600", marginTop: "-80px", opacity: "0.8", position: "fixed" }

const clickableContainer = { position: "absolute", top: "0px", width: "100vw", height: "100vh", zIndex: "601", marginTop: "-80px", display: "flex", justifyContent: "center", alignItems: "center" }
const infoBox = { width: "600px", backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0px 0px 40px darkgrey", position: "fixed" }
const contactRow = { display: "flex", width: "100%", justifyContent: "space-between", height: "80px", alignItems: "center" }


const ContactModal = ({ setContactShowing, user, setNameChange }) => {

    const [overModal, setOverModal] = useState(false)
    const [contactInitialised, setContactInitialised] = useState("")
    const [updateClickable, setUpdateClickable] = useState(false)

    const [userContacts, setUserContacts] = useState({
        name: user.given_name,
        email: user.email,
        phone: "",
        social: ""
    })


    const patchContactInfo = async () => {
        try {
            await fetch(`api/users/contacts/${contactInitialised}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    userId: user.sub,
                    userName: userContacts.name,
                    userEmail: userContacts.email,
                    userPhone: userContacts.phone,
                    userSocial: userContacts.social
                })
            })
            setNameChange(true)
        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    const postContactInfo = async () => {
        try {
            await fetch('api/users/contacts', {
                method: 'POST',
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    userId: user.sub,
                    userName: userContacts.name,
                    userEmail: userContacts.email,
                    userPhone: userContacts.phone,
                    userSocial: userContacts.social
                })
            })
            setNameChange(true)
        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    const checkForExistingContact = async () => {
        try {
            const res = await fetch(`api/users/contacts/mine/${user.sub}`, {
                method: 'GET'
            })
            const { data } = await res.json()

            if (data._id) {
                setContactInitialised(data._id)
            }

            setUserContacts({
                name: data.userName,
                email: data.userEmail,
                phone: data.userPhone,
                social: data.userSocial
            })


        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    useEffect(() => {
        checkForExistingContact()
    }, [])


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
                    <div
                        onClick={() => setContactShowing(false)}
                        style={{ position: "absolute", marginLeft: "520px", marginTop: "-16px", cursor: "pointer" }}
                    >
                        X
                    </div>

                    <h2>{"Contact Information"}</h2>

                    <div style={contactRow}>
                        <div style={{ width: "30%" }}>{"NAME: "}</div>
                        <input
                            value={userContacts.name}
                            style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                            onChange={(e) => {
                                setUserContacts({ ...userContacts, name: e.target.value })
                                if (e.target.value !== userContacts.name) {
                                    setUpdateClickable(true)
                                }
                            }}
                        />
                    </div>

                    <div style={contactRow}>
                        <div style={{ width: "30%" }}>{"EMAIL: "}</div>
                        <input
                            value={userContacts.email}
                            style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                            onChange={(e) => {
                                setUserContacts({ ...userContacts, email: e.target.value })
                                if (e.target.value !== userContacts.email) {
                                    setUpdateClickable(true)
                                }
                            }}
                        />
                    </div>

                    <div style={contactRow}>
                        <div style={{ width: "30%" }}>{"PHONE: "}</div>
                        <input
                            value={userContacts.phone}
                            style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                            onChange={(e) => {
                                setUserContacts({ ...userContacts, phone: e.target.value })
                                if (e.target.value !== userContacts.phone) {
                                    setUpdateClickable(true)
                                }
                            }}
                        />
                    </div>

                    <div style={contactRow}>
                        <div style={{ width: "30%" }}>{"SOCIAL: "}</div>
                        <input
                            value={userContacts.social}
                            style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                            onChange={(e) => {
                                setUserContacts({ ...userContacts, social: e.target.value })
                                if (e.target.value !== userContacts.social) {
                                    setUpdateClickable(true)
                                }
                            }}
                        />
                    </div>

                    <div style={{ height: "40px" }} />

                    {updateClickable && (
                        <div
                            className="contact-button"
                            onClick={() => {
                                if (contactInitialised) {
                                    patchContactInfo()
                                    setContactShowing(false)
                                } else {
                                    postContactInfo()
                                    setContactShowing(false)
                                }
                            }}
                        >
                            {"UPDATE CONTACT INFO"}
                        </div>
                    )}
                </div>
            </div>
        </>

    )

}


export default ContactModal;