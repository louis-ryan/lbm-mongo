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
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        social: ""
    })

    const noContactMethods = userContacts.email === "" && userContacts.phone === "" && userContacts.social === ""


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


    useEffect(() => {
        if (userContacts.social.includes("facebook.com/") && userContacts.social.includes("https://")) {
            setErrors({ ...errors, social: "" })
        } else {
            setErrors({ ...errors, social: "Make sure your facebook address is correctly formatted (including 'https://')" })
        }

        if (userContacts.social === "") {
            setErrors({ ...errors, social: "" })
        }
    }, [userContacts.social])


    useEffect(() => {
        if (userContacts.name && userContacts.name.length > 0) {
            setErrors({ ...errors, name: "" })
        } else {
            setErrors({ ...errors, name: "You must include a name in your contacts" })
        }
    }, [userContacts.name])



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
                            className={errors.name ? "error" : ""}
                            value={userContacts.name}
                            placeholder="Your Name"
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
                            placeholder="your.email@mailclient.com"
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
                            placeholder="0000 000 000"
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
                        <div style={{ width: "30%" }}>{"FACEBOOK: "}</div>
                        <input
                            className={errors.social ? "error" : ""}
                            value={userContacts.social}
                            placeholder="https://www.facebook.com/your-profile-path/"
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

                    {updateClickable && !errors.social && !errors.name && !noContactMethods && (
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

                    {errors.name && (
                        <div style={{ width: "100%", padding: "16px", backgroundColor: "rgb(165, 117, 131)", borderRadius: "4px", color: "white", fontSize: "14px", marginBottom: "4px" }}>{errors.name}</div>
                    )}

                    {errors.social && (
                        <div style={{ width: "100%", padding: "16px", backgroundColor: "rgb(165, 117, 131)", borderRadius: "4px", color: "white", fontSize: "14px", marginBottom: "4px" }}>{errors.social}</div>
                    )}

                    {noContactMethods && (
                        <div style={{ width: "100%", padding: "16px", backgroundColor: "rgb(165, 117, 131)", borderRadius: "4px", color: "white", fontSize: "14px", marginBottom: "4px" }}>{"You must have at least one method of contact"}</div>
                    )}
                </div>
            </div>
        </>

    )

}


export default ContactModal;