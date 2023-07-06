const ListingEditToggle = ({ mobileView, setMobileView }) => {


    return (
        <div
            onClick={() => mobileView === "NOTES" ? setMobileView("FILTERS") : setMobileView("NOTES")}
            style={{ width: "calc(100% - 16px)", textAlign: "center", padding: "8px", margin: "24px 8px 0px 8px", backgroundColor: "black", color: "white", cursor: "pointer", borderRadius: "8px" }}
        >
            {mobileView === "FILTERS" ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <svg width="40px" height="40px" viewBox="0 0 40 40">
                            <g id="Listing-View" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path d="M34.5,31.5 L22.5,31.5 L22.5,23.5 L16.5,23.5 L16.5,31.5 L5.5,31.5 L5.5,15.5 L4.60984036,15.5 L19.0245365,5.58989641 L26.5,9.86158984 L26.5,7.5 L30.5,7.5 L30.5,12.2675919 L35.3486122,15.5 L34.5,15.5 L34.5,31.5 Z" stroke="#FFFFFF"></path>
                            </g>
                        </svg>
                    </div>
                    <div style={{ margin: "12px 0px 0px 8px" }}>VIEW LISTINGS</div>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <svg width="40px" height="40px" viewBox="0 0 40 40">
                            <g id="Filter-View" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path d="M36.5,13.5000258 L15.1627875,13.5011247 C14.6006776,14.6828703 13.395819,15.5 12,15.5 C10.6042039,15.5 9.39936197,14.6828971 8.83724014,13.5011829 L4.5,13.5001223 L4.5,10.4999867 L8.83673881,10.4998715 C9.39864523,9.31758877 10.6037888,8.5 12,8.5 C13.3962137,8.5 14.6013591,9.31759169 15.1632642,10.4998779 L36.5,10.4999972 L36.5,13.5000258 Z" id="Combined-Shape" stroke="#FFFFFF"></path>
                                <path d="M35.1626914,21.5013269 C34.6005402,22.6829635 33.3957394,23.5 32,23.5 C30.6041803,23.5 29.3993211,22.6828694 28.8372116,21.5011228 L4.5,21.5000226 L4.5,18.4999975 L28.8367357,18.4998781 C29.3986408,17.3175918 30.6037863,16.5 32,16.5 C33.396205,16.5 34.6013441,17.3175816 35.1632538,18.4998559 L36.5,18.4999608 L36.5,21.500361 L35.1626914,21.5013269 Z" id="Combined-Shape" stroke="#FFFFFF"></path>
                                <path d="M36.5,29.500041 L23.1627832,29.5011339 C22.6006713,30.6828745 21.3958154,31.5 20,31.5 C18.6041854,31.5 17.39933,30.6828754 16.8372178,29.5011359 L4.5,29.5000442 L4.5,26.4999952 L16.8367364,26.4998767 C17.3986418,25.3175911 18.6037868,24.5 20,24.5 C21.3962133,24.5 22.6013584,25.3175912 23.1632637,26.4998769 L36.5,26.4999956 L36.5,29.500041 Z" id="Combined-Shape" stroke="#FFFFFF"></path>
                            </g>
                        </svg>
                    </div>
                    <div style={{ margin: "12px 0px 0px 8px" }}>EDIT FILTERS</div>
                </div>
            )}
        </div>
    )
}

export default ListingEditToggle;