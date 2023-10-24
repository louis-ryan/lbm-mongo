import FilterHeader from "./FilterHeader";
import typeIcon from '../../public/filter_icons/House Type.svg';
import apartmentIcon from '../../public/property_types/Apartment.svg';
import houseIcon from '../../public/property_types/House.svg';
import studentAccomIcon from '../../public/property_types/Student Accom.svg';
import townhouseIcon from '../../public/property_types/Townhouse.svg';


const Option = ({ type, icon, name, event, filter }) => (
    <div
        onClick={event}
        style={{ border: filter.type.includes(type) ? "2px solid grey" : "1px solid lightgray", borderRadius: "4px", padding: "0px 16px 16px 16px", textAlign: 'center', cursor: "pointer", filter: filter.type.includes(type) ? "saturate(1)" : "saturate(0)" }}
    >
        <img src={icon} style={{ opacity: filter.type.includes(type) ? "1" : "0.5" }} />
        <div>{name}</div>
    </div>
)


const PropertyType = ({ reveal, setReveal, filter, setFilter }) => {

    const activeCondition = filter.type.length > 0


    const formatSubTitle = (type) => {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        const capitalizedArray = type.map(capitalizeFirstLetter);

        if (capitalizedArray.length > 0) {
            return capitalizedArray.join(', ');
        } else {
            return "No property type selected"
        }
    }


    const handleSetType = (type) => {

        var typeArr = [...filter.type]

        const index = typeArr.indexOf(type);

        if (index !== -1) {
            typeArr.splice(index, 1);
        } else {
            typeArr.push(type);
        }

        setFilter({ ...filter, type: typeArr })
    }


    return (
        <>
            <div className={`filter-box ${activeCondition && "selected"}`}>

                <FilterHeader
                    headerTitle={'Property type'}
                    headerSubTitle={filter.type ? `${formatSubTitle(filter.type)}` : "No property type selected"}
                    activeCondition={activeCondition}
                    onClick={() => {reveal === "TYPE" ? setReveal("NONE") : setReveal("TYPE"); window.scrollTo({ top: 172, behavior: 'smooth' })}}
                    icon={typeIcon}
                />

                {reveal === "TYPE" &&
                    <div style={{ padding: "16px" }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '8px' }}>
                            <Option type={"APARTMENT"} icon={apartmentIcon} name={"Apartment"} event={() => handleSetType('APARTMENT')} filter={filter} />
                            <Option type={"HOUSE"} icon={houseIcon} name={"House"} event={() => handleSetType('HOUSE')} filter={filter} />
                            <Option type={"STUDENT"} icon={studentAccomIcon} name={"Student accom"} event={() => handleSetType('STUDENT')} filter={filter} />
                            <Option type={"TOWNHOUSE"} icon={townhouseIcon} name={"Townhouse"} event={() => handleSetType('TOWNHOUSE')} filter={filter} />
                        </div>

                        <div style={{ height: "24px" }} />

                        <button
                            className="button secondary"
                            onClick={() => setFilter({ ...filter, type: [] })}
                            style={{ width: "100%", height: "40px" }}
                        >
                            {"Clear"}
                        </button>
                    </div>
                }
            </div>
        </>
    )

}

export default PropertyType;