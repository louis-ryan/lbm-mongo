const Action = (props) => {


    const {
        user,
        contactReveal,
        setContactReveal,
        contactView,
        setContactView,
        contactDetails,
        tenSecondTimer,
        deviceSize,
        setMobilePromoState
    } = props

    const oneSecondTimer = () => {
        setTimeout(function () {
            setMobilePromoState("PROMO")
            tenSecondTimer()
        }, 1000);
    }


    if (deviceSize === "DESKTOP") {
        return (
            <>

                <div
                    style={{
                        width: "100%",
                        backgroundColor: contactView === "CONTACT" ? "#5F8D7E" : "black",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: contactReveal ? "600px" : "80px",
                        cursor: contactView !== "CONTACT" && "pointer",
                        transition: "1s",
                        borderRadius: contactView === "CONTACT" && "8px",
                    }}
                    onClick={() => {
                        setContactReveal(true)
                        if (contactView === "NONE") { setContactView("PROMO") }
                        tenSecondTimer()
                    }}
                >
                    {!contactReveal ? (
                        <div>{"REVEAL BREAKER CONTACT"}</div>
                    ) : (
                        contactView === "PROMO" ? (
                            <div style={{ width: "90%", height: "90%", backgroundColor: "white", overflow: "hidden" }}>

                                {/* <div style={{ position: "absolute", color: "blue", marginLeft: "720px", marginTop: "520px", fontSize: "16px", fontWeight: "800" }}>{"quick ad"}</div> */}

                                <a
                                    href="https://www.redbubble.com/i/throw-pillow/Surreal-Suburban-Landscape-by-billbayer89/148450601.5X2YF"
                                    target="_blank"
                                >
                                    <img
                                        src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/67ac49fa-ce0b-414a-9859-b96968745ff5/throw_pillow_promo.png?format=2500w"
                                        style={{ width: "100%" }}
                                    />
                                </a>
                            </div>
                        ) : (
                            <div style={{ width: "80%", fontSize: "32px", fontWeight: "800" }}>

                                <div>{user.given_name}´s Contact Details</div>

                                <div style={{ height: "24px" }} />

                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                    <div>Email:</div>
                                    <div>{contactDetails.email}</div>
                                </div>

                                <div style={{ height: "24px" }} />

                                {contactDetails.phone && (
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <div>Phone:</div>
                                        <div>{contactDetails.phone}</div>
                                    </div>
                                )}

                                <div style={{ height: "24px" }} />

                                {contactDetails.social && (
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <div>Social:</div>
                                        <div>{contactDetails.social}</div>
                                    </div>
                                )}
                            </div>
                        )
                    )}

                </div>
                <div style={{ height: "8px", width: contactView === "NONE" ? "0%" : "100%", backgroundColor: "#00F2C4", transition: "linear 10s", borderRadius: "8px", marginTop: "4px", display: contactView === "CONTACT" && "none" }} />



            </>

        )
    } else {
        if (contactView === "PROMO") {
            return (
                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: "0px", left: "0px", zIndex: "600", backgroundColor: "white", overflow: "hidden" }}>

                    {/* <div style={{ position: "absolute", color: "blue", marginLeft: "720px", marginTop: "520px", fontSize: "16px", fontWeight: "800" }}>{"quick ad"}</div> */}

                    <a
                        href="https://www.redbubble.com/i/throw-pillow/Surreal-Suburban-Landscape-by-billbayer89/148450601.5X2YF"
                        target="_blank"
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/67ac49fa-ce0b-414a-9859-b96968745ff5/throw_pillow_promo.png?format=2500w"
                            style={{ width: "100%" }}
                        />
                    </a>
                </div>
            )
        } else {
            return (

                <>


                    <div
                        style={{
                            width: "100%",
                            backgroundColor: contactView === "CONTACT" ? "#5F8D7E" : "black",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: contactReveal ? "600px" : "80px",
                            cursor: contactView !== "CONTACT" && "pointer",
                            transition: "1s",
                            borderRadius: contactView === "CONTACT" && "8px",
                        }}
                        onClick={() => {
                            setContactReveal(true)
                            if (contactView === "NONE") {
                                setContactView("PROMO")
                                setMobilePromoState("PROMO_INIT")
                            }
                            oneSecondTimer()
                        }}
                    >

                        {!contactReveal ? (
                            <div>{"REVEAL BREAKER CONTACT"}</div>
                        ) : (
                            contactView === "PROMO" ? (
                                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: "0px", left: "0px", zIndex: "600", backgroundColor: "white", overflow: "hidden" }}>

                                    {/* <div style={{ position: "absolute", color: "blue", marginLeft: "720px", marginTop: "520px", fontSize: "16px", fontWeight: "800" }}>{"quick ad"}</div> */}

                                    <a
                                        href="https://www.redbubble.com/i/throw-pillow/Surreal-Suburban-Landscape-by-billbayer89/148450601.5X2YF"
                                        target="_blank"
                                    >
                                        <img
                                            src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/67ac49fa-ce0b-414a-9859-b96968745ff5/throw_pillow_promo.png?format=2500w"
                                            style={{ width: "100%" }}
                                        />
                                    </a>
                                </div>
                            ) : (
                                <div style={{ width: "90%", fontSize: "16px", fontWeight: "800" }}>

                                    <div>{user.given_name}´s Contact Details</div>

                                    <div style={{ height: "24px" }} />

                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <div>Email:</div>
                                        <div>{contactDetails.email}</div>
                                    </div>

                                    <div style={{ height: "24px" }} />

                                    {contactDetails.phone && (
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                            <div>Phone:</div>
                                            <div>{contactDetails.phone}</div>
                                        </div>
                                    )}

                                    <div style={{ height: "24px" }} />

                                    {contactDetails.social && (
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                            <div>Social:</div>
                                            <div>{contactDetails.social}</div>
                                        </div>
                                    )}
                                </div>
                            )
                        )}


                    </div>
                </>

            )
        }

    }

}

export default Action;