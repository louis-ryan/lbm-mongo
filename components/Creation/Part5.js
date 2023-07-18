import { useEffect, useState } from "react"


const contactRow = { display: "flex", width: "100%", justifyContent: "space-between", height: "80px", alignItems: "center" }


const Part5 = (props) => {


    const [contactInitialised, setContactInitialised] = useState("")
    const [updateClickable, setUpdateClickable] = useState(false)

    const [userContacts, setUserContacts] = useState({
        name: props.user.name,
        email: props.user.email,
        phone: "",
        social: ""
    })


    const patchContactInfo = async () => {
        try {
            await fetch(`api/users/contacts/${contactInitialised}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    userId: props.user.sub,
                    userName: userContacts.name,
                    userEmail: userContacts.email,
                    userPhone: userContacts.phone,
                    userSocial: userContacts.social
                })
            })
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
                    userId: props.user.sub,
                    userName: userContacts.name,
                    userEmail: userContacts.email,
                    userPhone: userContacts.phone,
                    userSocial: userContacts.social
                })
            })
        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    const checkForExistingContact = async () => {
        try {
            const res = await fetch('api/users/contacts', {
                method: 'GET'
            })
            const { data } = await res.json()

            data.map((contact) => {
                if (contact.userId === props.user.sub) {
                    setContactInitialised(contact._id)
                    setUserContacts({
                        name: contact.userName,
                        email: contact.userEmail,
                        phone: contact.userPhone,
                        social: contact.userSocial
                    })
                }
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
            <div style={{ height: "16px" }} />

            <h1>{'Part 6/6: Contact'}</h1>

            <div style={{ height: "40px" }} />

            Confirm your contact details

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
                    style={{ width: "100%", backgroundColor: "black", padding: "24px", textAlign: "center", color: "white" }}
                    onClick={() => {
                        if (contactInitialised) {
                            patchContactInfo()
                        } else {
                            postContactInfo()
                        }
                    }}
                >
                    {"UPDATE CONTACT INFO"}
                </div>
            )}


            <div style={{height: "24px"}}/>



            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div
                    className="button secondary"
                    onClick={() => props.setPart(4)}
                    style={{ width: "48%" }}
                >
                    Back
                </div>

                <div
                    className="button primary"
                    onClick={() => props.setPart(6)}
                    style={{ width: "48%" }}
                >
                    Final Step
                </div>
            </div>



            <div style={{ height: "24px" }} />

        </>
    )
}

export default Part5;