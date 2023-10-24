import FilterHeader from "./FilterHeader";
import detailsIcon from '../../public/filter_icons/Details.svg';


const Rooms = ({ reveal, setReveal, deviceSize, filter, setFilter }) => {

    const activeCondition = (filter.petsAllowed || filter.parkingSpace || filter.terrace || filter.garden || filter.noSharedWalls || filter.noSharedFloor || filter.walkToSupermarket || filter.walkToTrain)

    const detailStyle = { width: "100%", textAlign: "center", marginBottom: "4px", cursor: "pointer", height: "40px" }

    const boolArray = [
        { name: 'Pets allowed', var: 'petsAllowed' },
        { name: 'Parking space', var: 'parkingSpace' },
        { name: 'Outdoor terrace', var: 'terrace' },
        { name: 'Garden', var: 'garden' },
        { name: 'No shared walls', var: 'noSharedWalls' },
        { name: 'No shared floor or ceiling', var: 'noSharedFloor' },
        { name: 'Supermarket within 1km', var: 'walkToSupermarket' },
        { name: 'Trainstation within 1km', var: 'walkToTrain' }
    ]

    const getHeaderSubtitle = () => {
        var activeDetails = []
        boolArray.map((bool) => {
            if (!filter[bool.var]) return
            activeDetails.push(bool.var)
        })
        return `Filtering by ${activeDetails.length} detail${activeDetails.length !== 1 ? 's' : ''}`

    }


    return (
        <>
            <div className={`filter-box ${activeCondition && "selected"}`}>

                <FilterHeader
                    headerTitle={'Details'}
                    headerSubTitle={getHeaderSubtitle()}
                    activeCondition={activeCondition}
                    onClick={() => {reveal === "DETAILS" ? setReveal("NONE") : setReveal("DETAILS"); window.scrollTo({ top: 340, behavior: 'smooth' })}}
                    icon={detailsIcon}
                />

                {reveal === "DETAILS" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            Property must have...

                            <div style={{ height: "24px" }} />

                            {boolArray.map((bool) => (
                                <button
                                    className="toggle button"
                                    key={bool.var}
                                    onClick={() =>
                                        setFilter(() =>
                                            filter[bool.var] ?
                                                { ...filter, [bool.var]: false } :
                                                { ...filter, [bool.var]: true }
                                        )}
                                    style={{
                                        ...detailStyle,
                                        backgroundColor: filter[bool.var] && "#00F2C4",
                                        color: filter[bool.var] && "black"
                                    }}
                                >
                                    {bool.name}
                                </button>
                            ))}

                            <div style={{ height: "40px" }} />
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default Rooms;