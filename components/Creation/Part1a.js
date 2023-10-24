import { useEffect } from "react";
import petsIcon from '../../public/icons/Pets.svg';
import parkingIcon from '../../public/icons/Parking.svg';
import outdoorIcon from '../../public/icons/Outdoor.svg';
import gardenIcon from '../../public/icons/Garden.svg';
import supermarketIcon from '../../public/icons/Shopping.svg';
import trainIcon from '../../public/icons/Train.svg';
import NavButtons from "./NavButtons";


const Bool = ({ setter, condition, title, icon }) => (
    <div className="form-bool" style={{ border: condition && "2px solid black" }} onClick={setter}>
        <img src={icon} style={{ width: "32px" }} />
        <p style={{ color: condition && "black", marginLeft: "4px" }}>{title}</p>
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

            <h1>{'Part 3/8: Details'}</h1>

            <div style={{ height: "32px" }} />

            <h3 style={{ marginBottom: "16px" }}>{"Does the property have..."}</h3>

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                <Bool
                    setter={() => props.setFormBools({ ...props.formBools, petsAllowed: props.formBools.petsAllowed ? false : true })}
                    condition={props.formBools.petsAllowed} title={"Pets allowed"} icon={petsIcon}
                />

                <Bool
                    setter={() => props.setFormBools({ ...props.formBools, parkingSpace: props.formBools.parkingSpace ? false : true })}
                    condition={props.formBools.parkingSpace} title={"Parking"} icon={parkingIcon}
                />

                <div style={{ width: "100%", height: "16px" }} />

                <Bool
                    setter={() => props.setFormBools({ ...props.formBools, outdoorArea: props.formBools.outdoorArea ? false : true })}
                    condition={props.formBools.outdoorArea} title={"Terrace"} icon={outdoorIcon}
                />

                <Bool
                    setter={() => props.setFormBools({ ...props.formBools, garden: props.formBools.garden ? false : true })}
                    condition={props.formBools.garden} title={"Garden"} icon={gardenIcon}
                />
            </div>

            <h3 style={{ margin: "16px 0px" }}>{"Is it less than 1km to a..."}</h3>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <Bool
                    setter={() => props.setFormBools({ ...props.formBools, supermarket: props.formBools.supermarket ? false : true })}
                    condition={props.formBools.supermarket} title={"Supermarket"} icon={supermarketIcon}
                />

                <Bool
                    setter={() => props.setFormBools({ ...props.formBools, trainStation: props.formBools.trainStation ? false : true })}
                    condition={props.formBools.trainStation} title={"Trainstation"} icon={trainIcon}
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