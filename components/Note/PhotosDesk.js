const PhotosDesk = ({ pics }) => {

    return (
        <div style={{ display: "flex", justifyContent: "left", overflow: "scroll" }}>
            {pics.map((pic, idx) => {

                return (
                    <div key={idx}>
                        <img
                            src={pic.url}
                            style={{ height: "400px" }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PhotosDesk;