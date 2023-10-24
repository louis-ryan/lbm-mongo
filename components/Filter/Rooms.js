import FilterHeader from "./FilterHeader";
import roomsIcon from '../../public/filter_icons/Rooms.svg';


const Rooms = ({ reveal, setReveal, deviceSize, filter, setFilter }) => {

    const activeCondition = (filter.minBed > 0 || filter.minBath > 0)

    const handleChange = (e, room) => {
        if (e.target.value) {
            setFilter({ ...filter, [room]: parseInt(e.target.value) })
        } else {
            setFilter({ ...filter, [room]: 0 })
        }
    }


    return (
        <>
            <div className={`filter-box ${activeCondition && "selected"}`}>

                <FilterHeader
                    headerTitle={'Rooms'}
                    headerSubTitle={`living/bed: ${filter.minBed} bath:  ${filter.minBath}`}
                    activeCondition={activeCondition}
                    onClick={() => {reveal === "ROOMS" ? setReveal("NONE") : setReveal("ROOMS"); window.scrollTo({ top: 220, behavior: 'smooth' })}}
                    icon={roomsIcon}

                />

                {reveal === "ROOMS" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "48%" }}>
                                    Min number of Bed/Livingrooms
                                    <input
                                        value={filter.minBed > 0 ? filter.minBed : ''}
                                        onChange={(e) => handleChange(e, 'minBed')}
                                        style={{ padding: "24px 8px", width: "100%", fontSize: "24px" }}
                                    />
                                </div>
                                <div style={{ width: "48%" }}>
                                    Min number of Bathrooms
                                    <input
                                        value={filter.minBath > 0 ? filter.minBath : ''}
                                        onChange={(e) => handleChange(e, 'minBath')}
                                        style={{ padding: "24px 8px", width: "100%", fontSize: "24px" }}
                                    />
                                </div>
                            </div>

                            <div style={{ height: "40px" }} />
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default Rooms;