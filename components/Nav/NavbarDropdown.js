const DropdownArrow = () => (
    <svg width="62px" height="40px" viewBox="0 0 62 40" style={{ transform: "translate(116px, 4px)" }}>
        <g id="Logging-Arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M31,11 C37.0328181,22.7380747 42.0328181,30.4047414 46,34 C49.9671819,37.5952586 55.6338486,39.5952586 63,40 L-1,40 C6.47263269,39.49876 12.1392994,37.49876 16,34 C19.8607006,30.50124 24.8607006,22.8345734 31,11 Z" id="Rectangle" fill="#000000"></path>
        </g>
    </svg>
)

const NavbarOption = ({ setModalShowing, optionName }) => (
    <div onClick={() => setModalShowing(true)} style={{ outline: "1px grey solid", color: "white", width: "100%", padding: "16px", maxWidth: "600px", cursor: "pointer" }}>
        <div style={{ textDecoration: "none" }}> {optionName} </div>
    </div>
)

const NavbarDropdown = ({ setUserOptions, setContactShowing, setDocumentsShowing, myListings }) => {

    return (

        <div
            onClick={() => setUserOptions(false)}
            style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: "200", top: "0px", right: "0px" }}
        >
            <div style={{ position: "absolute", width: "208px", zIndex: "10", top: "48px", right: "40px" }}>

                <DropdownArrow />

                <div style={{ backgroundColor: "black", padding: "16px", maxHeight: "600px", overflow: "scroll" }}>

                    <NavbarOption setModalShowing={setContactShowing} optionName={"My Contact"} />

                    <div style={{ height: "8px" }} />

                    <NavbarOption setModalShowing={setDocumentsShowing} optionName={"My Documents"} />

                    <div style={{ height: "8px" }} />

                    {myListings.map((listing) => (

                        <a
                            key={listing._id}
                            href={`/${listing._id}`}
                            style={{ outline: "1px grey solid", color: "white", width: "100%", padding: "16px", maxWidth: "600px", cursor: "pointer", display: "flex", marginBottom: "8px", textDecoration: "none" }}
                        >
                            <div style={{ width: "40px", overflow: "hidden" }}>
                                {listing.pics[0] ? (
                                    <img
                                        src={listing.pics[0].url}
                                        style={{ height: "40px" }}
                                    />
                                ) : (
                                    <img
                                        src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w"
                                        style={{ height: "40px" }}
                                    />
                                )}

                            </div>

                            <div style={{ width: "8px" }} />

                            <div style={{ fontSize: "12px", textDecoration: "none" }}>
                                {"Your property in " + listing.address}
                            </div>

                        </a>
                    ))}

                    <div style={{ outline: "1px red solid", width: "100%", padding: "16px", maxWidth: "600px" }}>
                        <a
                            href="/api/auth/logout"
                            style={{ textDecoration: "none", color: "red" }}
                        >
                            Sign out
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NavbarDropdown;