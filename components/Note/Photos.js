const Photos = ({ pics }) => {

    return (
        <div style={{ height: "calc(100vh - 240px)", overflow: "scroll" }} >

            {pics.map((pic, idx) => {
                
                return (
                    <div key={idx}>
                        <img
                            src={pic.url}
                            style={{ width: "100%" }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Photos;