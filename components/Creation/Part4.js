import PicUpload from "./PicUpload";


const PicsWrapper = `display: flex; flex-wrap: wrap; justify-content: space-between;`;


const Part4 = (props) => {

    return (
        <>
            Photos

            <div>
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

            <div
                onClick={() => props.handleSubmit()}
                style={{ bottom: "24px", height: "60px", backgroundColor: "#1E304E", color: "white", textAlign: "center", alignItems: "center", paddingTop: "18px", borderRadius: "4px", marginTop: "40px" }}
            >
                Create
            </div>

        </>
    )
}

export default Part4;