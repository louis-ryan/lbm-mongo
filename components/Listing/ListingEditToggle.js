const ListingEditToggle = ({ mobileView, setMobileView }) => {


    return (
        <div
            onClick={() => mobileView === "NOTES" ? setMobileView("FILTERS") : setMobileView("NOTES")}
            style={{ transform: "translateX(-4px)" }}
        >
            {mobileView === "FILTERS" ? (
                <img src={'Mob_View_Selector_Filters.svg'} alt={'toggle_to_filter'} style={{ width: "100vw" }} />
            ) : (
                <img src={'Mob_View_Selector_Listings.svg'} alt={'toggle_to_listings'} style={{ width: "100vw" }} />
            )}
        </div>
    )
}

export default ListingEditToggle;