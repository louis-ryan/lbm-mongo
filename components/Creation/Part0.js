import { useEffect } from "react"
import InputHeader from "./InputHeader"
import PostCode from "./PostCode"
import mapPath from "./MapPath"


const Map = ({ mapPath, props }) => (
    <div style={{
        transform: "scale(0.18) translateY(-600px) translateX(-600px)",
        height: "320px"
    }}>

        <svg width="1600px" height="1600px">
            <g id="Artboard-Copy-8" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.607136805">
                <path d={mapPath} id="Rectangle" stroke="#979797" strokeWidth="4" fill="#D8D8D8"></path>
            </g>
        </svg>

        {props.postCode > 2999 && !props.errors.address &&
            <div style={{ position: "absolute", width: "1600px", height: "1600px", zIndex: "20", marginTop: "-1600px" }}>
                <div style={{ width: "80px", height: "80px", backgroundColor: "white", marginLeft: `${props.longInPx - 40}px`, marginTop: `${props.latInPx - 40}px`, borderRadius: "100%", boxShadow: "0px 0px 0px 80px rgb(0, 242, 196)" }}></div>
            </div>
        }

    </div>
)


const Part1 = (props) => {


    const handleNextButton = {
        opacity: props.form.postCode && props.form.address ? "1" : "0.5",
        pointerEvents: props.form.postCode && props.form.address ? "inherit" : "none",
    }

    /**
     * If only one option in addresses list, select by default
     */
    useEffect(() => {
        if (props.validAddresses.length === 1) {
            props.handleAddress(props.validAddresses[0])
        }
    }, [props.validAddresses])


    return (
        <>
            <div style={{ height: "16px" }} />

            {/* <InputHeader header={'Part 1/5: Location'} /> */}

            <h1>{'Part 1/8: Location'}</h1>

            <Map
                mapPath={mapPath}
                props={props}
            />

            <PostCode
                handlePost={props.handlePost}
                errors={props.errors}
                post={props.post}
            />

            <div style={{ height: "8px" }} />

            <div
                className="button secondary"
                onClick={() => props.handleClearPost()}
                style={{ display: !props.post.postCode1 && !props.post.postCode2 && !props.post.postCode3 && !props.post.postCode1 && "none" }}
            >
                {"CLEAR"}
            </div>

            <div style={{ height: "24px" }} />

            {props.validAddresses && props.postCode > 2999 && (
                <>

                    <div style={{ height: "24px" }} />

                    <h3>{"Address"}</h3>

                    <div style={{ borderRadius: "4px", overflow: "hidden", marginTop: "4px", border: "grey 1px solid" }}>
                        {props.validAddresses.map((address) => {
                            return (
                                <div
                                    className="address-picker"
                                    key={address}
                                    style={{ backgroundColor: props.form.address === address ? "black" : "white", color: props.form.address === address && "white" }}
                                    onClick={() => props.handleAddress(address)}>
                                    {address}
                                </div>
                            )
                        })}
                    </div>
                </>
            )}

            <div style={{ height: "24px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(1)}
                style={handleNextButton}
            >
                NEXT
            </div>

        </>
    )
}


export default Part1;