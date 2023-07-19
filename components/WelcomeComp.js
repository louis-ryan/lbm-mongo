import useWelcomeCompLabelArr from "../custom_hooks/useWelcomCompLabelArr"


const labelStyle = { padding: "8px 32px 4px 16px", borderRadius: "8px", margin: "8px 8px 0px 0px", cursor: "pointer", border: "black 4px solid", backgroundColor: "white", color: "black" }


const WelcomeComp = ({ user, filter, setFilter, deviceSize }) => {


    const [activeLabelArr, labelsArr, setAllowSetArr] = useWelcomeCompLabelArr(filter)


    if (deviceSize === "DESKTOP") {
        return (
            <div style={{ width: "100%", borderRadius: "8px" }}>
                <div style={{ height: "60px" }} />
                <div style={{ fontSize: "32px" }}>Welcome {user && user.given_name}</div>
                <div style={{ height: "24px" }} />
            </div>
        )
    } else {
        return (
            <div style={{ width: "100%", padding: "16px" }}>
                <div style={{height: "24px"}}/>
                <img
                    src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/5cf24fcb-d5dc-44b2-a321-b28ee3d3e00d/lbm_new_logo.png?format=500w"
                    style={{ height: "80px" }}
                />
                <div style={{height: "24px"}}/>
                <div style={{ fontSize: "24px" }}>
                    {`Welcome 
                        ${user && user.given_name} 
                        `}
                </div>

                <div style={{ height: "24px" }} />

                {activeLabelArr.length > 0 && (
                    <div style={{ fontSize: "16px" }}>
                        {"you are filtering by the following search parametres"}
                    </div>
                )}
                <div style={{ height: "8px" }} />
                <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap" }}>

                    {labelsArr.map((label) => (
                        <div
                            key={label.name}
                            style={{ ...labelStyle, display: !label.condition ? "none" : "flex" }}
                            onClick={() => {
                                setFilter(label.newFilter)
                                setAllowSetArr(true)
                            }}
                        >
                            <div>
                                <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ height: "20px", filter: "invert(1)" }}>
                                    <g id="Delete" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
                                        <line x1="14.1585366" y1="14.1463415" x2="26.8414634" y2="25.8536585" id="Line" stroke="#FFFFFF" strokeLinecap="square"></line>
                                        <line x1="25.8589744" y1="14.1463415" x2="15.1410256" y2="25.8536585" id="Line-20" stroke="#FFFFFF" strokeLinecap="square"></line>
                                        <circle id="Oval" stroke="#FFFFFF" cx="20.5" cy="19.5" r="15"></circle>
                                    </g>
                                </svg>
                            </div>
                            <div>{label.name}</div>
                        </div>
                    )
                    )}
                </div>
            </div>
        )
    }


}

export default WelcomeComp;