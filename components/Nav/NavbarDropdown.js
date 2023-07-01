

const NavbarDropdown = ({ setUserOptions, setContactShowing }) => {

    return (

        <div
            onClick={() => setUserOptions(false)}
            style={{ position: "absolute", width: "100vw", height: "100vh", zIndex: "9", top: "0px", right: "0px" }}
        >
            <div style={{ position: "absolute", width: "208px", zIndex: "10", top: "48px", right: "24px" }}>

                <svg width="62px" height="40px" viewBox="0 0 62 40" style={{ transform: "translate(116px, 4px)" }}>
                    <g id="Logging-Arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path d="M31,11 C37.0328181,22.7380747 42.0328181,30.4047414 46,34 C49.9671819,37.5952586 55.6338486,39.5952586 63,40 L-1,40 C6.47263269,39.49876 12.1392994,37.49876 16,34 C19.8607006,30.50124 24.8607006,22.8345734 31,11 Z" id="Rectangle" fill="#000000"></path>
                    </g>
                </svg>

                <div style={{ backgroundColor: "black", padding: "16px" }}>

                    <div style={{ outline: "1px grey solid", width: "100%", padding: "16px", maxWidth: "600px" }}>
                        <div
                            style={{ textDecoration: "none" }}
                            onClick={() => setContactShowing(true)}
                        >
                            Contact
                        </div>
                    </div>

                    <div style={{ height: "8px" }} />

                    <div style={{ outline: "1px grey solid", width: "100%", padding: "16px", maxWidth: "600px" }}>
                        <a
                            href="/api/auth/logout"
                            style={{ textDecoration: "none" }}
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