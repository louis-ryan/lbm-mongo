import { useEffect } from "react";
import PicUpload from "./PicUpload";
import NavButtons from "./NavButtons";


const Part4 = (props) => {

    const handleNextButton = {
        opacity: "1",
        pointerEvents: "inherit",
    }


    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <div style={{ height: "16px" }} />

            <h1>{'Part 7/8: Photos'}</h1>

            <div style={{ height: "40px" }} />

            <h3>Upload some photos</h3>

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

            <NavButtons
                part={props.part}
                handleNextButton={handleNextButton}
                props={props}
            />
        </>
    )
}

export default Part4;