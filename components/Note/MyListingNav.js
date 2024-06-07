const NavButton = ({ name, clickLogic, style }) => (
    <h3 onClick={() => clickLogic()} style={style}> {name} </h3>
)


const MyListingNav = ({ applications, currentApplication, setCurrentApplication }) => {
    if (applications.length > 1) return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <NavButton
                name={"Back"}
                clickLogic={() => { currentApplication !== 0 && setCurrentApplication((app) => app - 1) }}
                style={{ opacity: currentApplication !== 0 ? "1" : "0.5", cursor: currentApplication !== 0 && "pointer" }}
            />

            {applications.map((application, idx) => (
                <div
                    key={application._id}
                    onClick={() => setCurrentApplication(idx)}
                    style={{ height: "16px", width: "16px", backgroundColor: currentApplication === idx ? "grey" : "lightgrey", cursor: currentApplication !== idx && "pointer", borderRadius: "50%" }}
                />
            ))}

            <NavButton
                name={"Next"}
                clickLogic={() => { currentApplication !== applications.length - 1 && setCurrentApplication((app) => app + 1) }}
                style={{ opacity: currentApplication !== applications.length - 1 ? "1" : "0.5", cursor: currentApplication !== applications.length - 1 && "pointer" }}
            />
        </div>
    )
}


export default MyListingNav;