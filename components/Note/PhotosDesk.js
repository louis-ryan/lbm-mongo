const PhotosDesk = ({ pics }) => {

    return (
        <div style={{ display: "flex", justifyContent: "left", overflow: "scroll" }}>
            {pics.map((pic, idx) => {

                return (
                    <div key={idx} style={{marginRight: "8px"}}>
                        <img
                            src={pic.url}
                            alt="property photo"
                            style={{ height: "400px" }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PhotosDesk;