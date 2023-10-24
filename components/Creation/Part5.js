import { useEffect, useState } from "react"


const contactRow = { display: "flex", justifyContent: "space-between", height: "80px", alignItems: "center" }


const Part5 = (props) => {


    const [contactInitialised, setContactInitialised] = useState("")

    const [userContacts, setUserContacts] = useState({
        name: props.user.given_name,
        email: props.user.email,
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


    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


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
            const res = await fetch(`api/users/contacts/mine/${props.user.sub}`, {
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
            <div style={{ height: "16px" }} />

            <h1>{'Part 8/8: Confirm contacts'}</h1>

            <div style={{ height: "40px" }} />

            <div style={contactRow}>
                <h3 style={{ width: "30%" }}>{"NAME: "}</h3>
                <input
                    className={errors.name ? "error" : ""}
                    value={userContacts.name}
                    placeholder="Your Name"
                    style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                    onChange={(e) => setUserContacts({ ...userContacts, name: e.target.value })}
                />
            </div>

            <div style={contactRow}>
                <h3 style={{ width: "30%" }}>{"EMAIL: "}</h3>
                <input
                    value={userContacts.email}
                    placeholder="your.email@mailclient.com"
                    style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                    onChange={(e) => setUserContacts({ ...userContacts, email: e.target.value })}
                />
            </div>

            <div style={contactRow}>
                <h3 style={{ width: "30%" }}>{"PHONE: "}</h3>
                <input
                    value={userContacts.phone}
                    placeholder="0000 000 000"
                    style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                    onChange={(e) => setUserContacts({ ...userContacts, phone: e.target.value })}
                />
            </div>

            <div style={contactRow}>
                <h3 style={{ width: "30%" }}>{"FACEBOOK: "}</h3>
                <input
                    className={errors.social ? "error" : ""}
                    value={userContacts.social}
                    placeholder="https://www.facebook.com/your-profile-path/"
                    style={{ width: "70%", padding: "8px", fontSize: "16px" }}
                    onChange={(e) => setUserContacts({ ...userContacts, social: e.target.value })}
                />
            </div>

            <div style={{ height: "40px" }} />

            {errors.name && (
                <div style={{ width: "100%", padding: "16px", backgroundColor: "rgb(165, 117, 131)", borderRadius: "4px", color: "white", fontSize: "14px", marginBottom: "4px" }}>{errors.name}</div>
            )}

            {errors.social && (
                <div style={{ width: "100%", padding: "16px", backgroundColor: "rgb(165, 117, 131)", borderRadius: "4px", color: "white", fontSize: "14px", marginBottom: "4px" }}>{errors.social}</div>
            )}

            {noContactMethods && (
                <div style={{ width: "100%", padding: "16px", backgroundColor: "rgb(165, 117, 131)", borderRadius: "4px", color: "white", fontSize: "14px", marginBottom: "4px" }}>{"You must have at least one method of contact"}</div>
            )}

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
                    onClick={() => {
                        props.setPart(8)
                        if (contactInitialised) {
                            patchContactInfo()
                        } else {
                            postContactInfo()
                        }
                    }}
                    style={{
                        width: "48%",
                        opacity: !errors.social && !errors.name && !noContactMethods ? "1" : "0.5",
                        pointerEvents: !errors.social && !errors.name && !noContactMethods ? "" : "none"
                    }}
                >
                    Review and Submit
                </div>
            </div>
        </>
    )
}

export default Part5;