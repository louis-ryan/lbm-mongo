import { useEffect } from "react";
import apartmentIcon from '../../public/property_types/Apartment.svg'
import houseIcon from '../../public/property_types/House.svg'
import townhouseIcon from '../../public/property_types/Townhouse.svg'
import studentAccomIcon from '../../public/property_types/Student Accom.svg'
import NavButtons from "./NavButtons";


const TypeInput = ({ type, img, alt, name, props }) => (
    <div
        className={`type-selector ${props.form.type === type && 'selected'}`}
        onClick={() => props.handleType(type)}
    >
        <img src={img} alt={alt} />
        <div style={{ color: "black" }}>{name}</div>
    </div>
)


const RoomInput = ({ title, name, setter, value }) => (
    <div style={{ width: "48%" }}>
        <h3 style={{ margin: "16px 0px" }}>{title}</h3>
        <input control='input' name={name} type='number' onChange={setter} value={value} style={{ textAlign: "center", fontSize: "24px", width: "100%", height: "60px" }} />
    </div>
)


const Part1 = (props) => {

    const handleNextButton = {
        opacity: props.form.numRoom && props.form.numBath ? "1" : "0.5",
        pointerEvents: props.form.numRoom && props.form.numBath ? "inherit" : "none",
    }

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);


    return (
        <>
            <div style={{ height: "16px" }} />

            <h1>{'Part 2/8: Property'}</h1>

            <div style={{ height: "32px" }} />

            <h3 style={{ marginBottom: "16px" }}>{"Property type"}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px' }}>

                <TypeInput type={'APARTMENT'} img={apartmentIcon} alt={'apartment icon'} name={"Apartment"} props={props} />
                <TypeInput type={'HOUSE'} img={houseIcon} alt={'house icon'} name={"Standalone house"} props={props} />
                <TypeInput type={'TOWNHOUSE'} img={townhouseIcon} alt={'townhouse icon'} name={"Townhouse"} props={props} />
                <TypeInput type={'STUDENT'} img={studentAccomIcon} alt={'student accommodation icon'} name={"Student accommodation"} props={props} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <RoomInput
                    title={"Bedrooms"} name={"numRoom"}
                    setter={props.handleChange}
                    value={props.form.numRoom}
                />

                <RoomInput
                    title={"Bathrooms"} name={"numBath"}
                    setter={props.handleChange}
                    value={props.form.numBath}
                />
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


export default Part1;