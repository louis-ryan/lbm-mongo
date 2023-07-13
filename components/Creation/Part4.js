import InputHeader from "./InputHeader";
import PicUpload from "./PicUpload";


const Part4 = (props) => {

    return (
        <>
            <div style={{ height: "16px" }} />

            {/* <InputHeader header={'Part 5/5: Photos'} /> */}

            <h1>{'Part 5/6: Photos'}</h1>

            <div style={{ height: "40px" }} />

            Upload some photos

            <div style={{ height: "4px" }} />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
                    return (
                        <PicUpload
                            key={id}
                            id={id}
                            uploadPhoto={props.compressFile}
                            form={props.form}
                            setForm={props.setForm}
                        />
                    )
                })}
            </div>

            <div style={{ height: "24px" }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div
                    className="button secondary"
                    onClick={() => props.setPart(3)}
                    style={{ width: "48%" }}
                >
                    Back
                </div>
                <div
                    className="button primary"
                    onClick={() => props.setPart(5)}
                    style={{ width: "48%" }}
                >
                    Next
                </div>
            </div>

            <div style={{ height: "24px" }} />

        </>
    )
}

export default Part4;