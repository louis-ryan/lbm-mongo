

const ListingCardRight = ({ note }) => {


    return (
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll", transform: "scale(1.1)" }}>
            {note.pics.length > 0 ? (
                note.pics.map((pic, idx) => {
                    return (
                        <span key={idx} style={{marginRight: "4px"}}>
                            <img
                                alt="note image"
                                src={pic.url}
                                style={{ height: "240px" }}
                            />
                        </span>
                    )
                })
            ) : (
                <div style={{ height: "240px", width: "100%", height: "100%", backgroundColor: "grey" }}>
                    <div style={{ height: "240px", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px", overflow: "hidden" }}>

                        <img
                            alt="blank image"
                            src={'LBM_hero_img.png'}
                            style={{ width: "100%", filter: "blur(2px) brightness(0.8)" }}
                        />
                        <h6 style={{ position: "absolute", zIndex: "40" }}>{"This listing has no photos"}</h6>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ListingCardRight;