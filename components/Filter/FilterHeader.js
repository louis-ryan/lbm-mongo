const HeaderIcon = ({ icon }) => (
    <div style={{ marginRight: "8px" }}>
        <img src={icon} alt={`${icon} icon`} style={{ height: "32px", marginTop: "12px" }} />
    </div>
)


const HeaderTitle = ({ headerTitle, headerSubTitle, activeCondition }) => (
    <div>
        <h3 style={{ color: activeCondition ? "black" : "grey", marginBottom: "8px" }}>{headerTitle}</h3>
        <div style={{ fontSize: "10px" }}>{headerSubTitle}</div>
    </div>
)


const ActiveTick = ({ activeCondition }) => (
    <div style={{ marginTop: "13px", opacity: activeCondition ? "1" : "0" }}>
        <svg width="40px" height="32px" viewBox="0 0 52 62" style={{ transform: "translateX(11px)" }}>
            <g id="Tick-Styled" stroke="none" strokeWidth="3" fill="none" fillRule="evenodd">
                <path d="M20,51 L40.3940137,51.7032419 C45.5376857,51.8806099 49.99548,55.3182667 51.4743818,60.2479392 L52,62 L52,62 L52,2.13162821e-13 L51.4116158,2.15740887 C49.9877789,7.37814405 45.2458626,11 39.8344499,11 L20,11 L20,11 C8.954305,11 0,19.954305 0,31 C0,42.045695 8.954305,51 20,51 Z" id="Oval" fill="#50554A"></path>
                <polyline id="Line-11" stroke="#FFFFFF" strokeLinecap="round" points="33 22 19.6829268 40 12 34"></polyline>
            </g>
        </svg>
    </div>
)


const FilterHeader = ({ headerTitle, headerSubTitle, activeCondition, onClick, icon }) => (
    <div className="filter-header" onClick={onClick}>
        <div style={{ display: "flex" }}>
            <HeaderIcon icon={icon} />
            <HeaderTitle headerTitle={headerTitle} headerSubTitle={headerSubTitle} activeCondition={activeCondition} />
        </div>
        <ActiveTick activeCondition={activeCondition} />
    </div>
)



export default FilterHeader;