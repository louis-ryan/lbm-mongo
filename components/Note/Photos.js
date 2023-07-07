const Photos = ({ pics }) => {

    return (
        <div>

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