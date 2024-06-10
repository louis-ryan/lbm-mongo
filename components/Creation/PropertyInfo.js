import Part0 from './Part0';
import Part1 from './Part1';
import Part1a from './Part1a';
import Part2 from './Part2';
import Part2a from './Part2a';
import Part3 from './Part3';
import Part4 from './Part4';
import Part5 from './Part5';
import Part6 from './Part6';


const Parts = ((props) => {

    switch (props.props.part) {
        case 0:
            return (
                <Part0
                    part={0}
                    errors={props.props.errors}
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                    handlePost={props.props.handlePost}
                    handleAddress={props.props.handleAddress}
                    postCode={props.props.postCode}
                    validAddresses={props.props.validAddresses}
                    latInPx={props.props.latInPx}
                    longInPx={props.props.longInPx}
                    handleClearPost={props.props.handleClearPost}
                    post={props.props.post}
                />
            )
        case 1:
            return (
                <Part1
                    part={1}
                    errors={props.props.errors}
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                    formBools={props.props.formBools}
                    setFormBools={props.props.setFormBools}
                    handleType={props.props.handleType}
                />
            )
        case 2:
            return (
                <Part1a
                    part={2}
                    errors={props.props.errors}
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                    formBools={props.props.formBools}
                    setFormBools={props.props.setFormBools}
                    handleType={props.props.handleType}
                />
            )
        case 3:
            return (
                <Part2
                    part={3}
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    setForm={props.props.setForm}
                    handleContractEnds={props.props.handleContractEnds}
                    handleContractTerminates={props.props.handleContractTerminates}
                    handleMoveInDate={props.props.handleMoveInDate}
                    handleRent={props.props.handleRent}
                />
            )
        case 4:
            return (
                <Part2a
                    part={4}
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    setForm={props.props.setForm}
                    handleContractEnds={props.props.handleContractEnds}
                    handleContractTerminates={props.props.handleContractTerminates}
                    handleMoveInDate={props.props.handleMoveInDate}
                    handleRent={props.props.handleRent}
                />
            )
        case 5:
            return (
                <Part3
                    part={5}
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    handleChange={props.props.handleChange}
                />
            )
        case 6:
            return (
                <Part4
                    part={6}
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    setForm={props.props.setForm}
                    compressFile={props.props.compressFile}
                />

            )
        case 7:
            return (
                <Part5
                    part={7}
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    setForm={props.props.setForm}
                    user={props.props.user}
                />
            )
        case 8:
            return (
                <Part6
                    part={8}
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    handleSubmit={props.props.handleSubmit}
                    device={props.props.device}
                />
            )
    }

})

const PropertyInfo = (props) => {


    return (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: props.device === "DESKTOP" && "120px" }}>
            <div
                style={{
                    width: props.device === "DESKTOP" ? "720px" : "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: props.device === "DESKTOP" && "white",
                    border: props.device === "DESKTOP" && "1px solid rgb(181, 181, 181)",
                    borderRadius: "8px",
                }}
            >
                <form style={{
                    width: "calc(100% - 32px)",
                    maxWidth: "400px",
                    padding: props.device === "DESKTOP" ? "40px 0px" : "20px 0px 80px 0px"
                }}>

                    <Parts props={props} />

                </form>
            </div>
        </div>
    )
}

export default PropertyInfo;