import { useEffect, useState } from "react";
import { Blocks } from 'react-loader-spinner';

const boxStyle = { height: "120px", width: "30%", backgroundColor: "lightgrey", marginBottom: "24px", display: "flex", justifyContent: "center", overflow: "hidden", borderRadius: "4px" }

const UploaderBox = ({ uploadPhoto }) => {

    const [clicked, setClicked] = useState(false)

    useEffect(() => {

        if (!clicked) return
        document.querySelectorAll("animate")[0].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[1].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[2].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[3].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[4].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[5].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[6].setAttribute('values', '#ffffff;#pink;#000000')
        document.querySelectorAll("animate")[7].setAttribute('values', '#ffffff;#pink;#000000')

    })


    return (
        <div style={{ ...boxStyle, backgroundColor: "black", alignItems: "center", cursor: "pointer" }}>

            <label htmlFor="file-upload" className="file-upload" style={{ padding: "40%" }}>
                {!clicked ? (
                    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" style={{ transform: "scale(1.5)" }}>
                        <g id="Upload-" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                            <path d="M8.0075,17 L8.00166667,31.0000003 C7.99907987,33.2091385 9.78919453,35.0007455 11.9983333,35.001666 C11.9988889,35.0016662 11.9994444,35.0016663 12,35 L28,35 C30.209139,35.0016663 32,33.2108053 32,31.0016663 C32,31.0011108 31.9999999,31.0005552 31.9983333,31.0000003 L31.9925,17 L31.9925,17" id="Line-12" stroke="#FFFFFF"></path>
                            <polyline id="Line-2" stroke="#FFFFFF" transform="translate(20.000000, 10.000000) rotate(315.000000) translate(-20.000000, -10.000000) " points="16 6 24 6 24 14"></polyline>
                            <line x1="20" y1="5" x2="20" y2="25" id="Line" stroke="#FFFFFF"></line>
                        </g>
                    </svg>
                ) : (
                    <Blocks
                        height="80"
                        width="80"
                        color="pink"
                        radius="4"
                        wrapperClassName="blocks-loader-ani"
                    />
                )}

            </label>
            <input
                id="file-upload"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    uploadPhoto(e)
                    setClicked(true)
                }}
                style={{ display: "none" }}
            />
        </div >
    )
}

const ImageBox = ({ form, id, setForm }) => {
    return (
        <div style={boxStyle}>
            <img
                src={form.pics && form.pics[id] && form.pics[id].url}
                alt={'property pic'}
                style={{ height: "100%" }}
                onClick={() => {
                    var newForm = { ...form }
                    newForm.pics.splice(id, 1)

                    setForm(newForm);
                }}
            />
        </div>
    )
}

const InactiveBox = ({ }) => {
    return (
        <div style={boxStyle} />
    )
}

const PicUpload = ({ id, uploadPhoto, form, setForm }) => {

    /**
     * Logic to handle the various states of the uploader boxes
     */
    if (form.pics) {
        if (id === form.pics.length) {
            return <UploaderBox uploadPhoto={uploadPhoto} />
        } else if (form.pics[id] && form.pics[id].url) {
            return <ImageBox form={form} id={id} setForm={setForm} />
        } else {
            return <InactiveBox />
        }
    } else {
        if (id === 0) {
            return <UploaderBox uploadPhoto={uploadPhoto} />
        } else {
            return <InactiveBox />
        }

    }


}


export default PicUpload;