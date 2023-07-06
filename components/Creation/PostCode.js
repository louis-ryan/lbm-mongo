

const PostCode = (props) => {

    const inputIsNumber = (e) => (e.target.value === "0" || e.target.value === "1" || e.target.value === "2" || e.target.value === "3" || e.target.value === "4" || e.target.value === "5" || e.target.value === "6" || e.target.value === "7" || e.target.value === "8" || e.target.value === "9")

    return (
        <>

            Postcode

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[1, 2, 3, 4].map((id) => {

                    switch (id) {
                        case 1: var inputVal = props.post.postCode1; break;
                        case 2: var inputVal = props.post.postCode2; break;
                        case 3: var inputVal = props.post.postCode3; break;
                        case 4: var inputVal = props.post.postCode4; break;
                    }

                    return (
                        <input
                            key={id}
                            placeholder={id > 1 ? "0" : "3"}
                            maxLength={1}
                            name={`postCode${id}`}
                            value={inputVal}
                            onChange={(e) => {
                                props.errors.address = ""
                                props.handlePost(e);
                                if (!document) return
                                if (id > 3) return
                                if (!inputIsNumber(e)) return
                                document.getElementsByName(`postCode${id + 1}`)[0].focus();
                            }}
                            style={{ border: props.errors.address && "2px solid #a57583", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent" }}
                            autoComplete="new-password"
                            type="number"
                        />
                    )
                })
                }
            </div>

            {props.errors.address && (
                <p style={{ background: "#a57583", borderRadius: "4px", marginTop: "4px", padding: "8px" }}>
                    {props.errors.address}
                </p>
            )}
        </>
    )
}

export default PostCode;