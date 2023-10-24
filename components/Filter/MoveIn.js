import FilterHeader from "./FilterHeader";
import moveInIcon from '../../public/filter_icons/Move In.svg';


const MoveIn = ({ reveal, setReveal, filter, setFilter }) => {

    const activeCondition = (filter.moveInEarliest || filter.moveInLatest)

    const handleValue = (event) => {
        if (!filter[event]) {
            return ''
        }
        if (filter[event].includes('T')) {
            const formattedDate = filter[event].split('T')
            return formattedDate[0]
        } else {
            return filter[event]
        }
    }


    const todaysDateGreaterThanFilter = () => {


        if (filter.moveInEarliest === null) return false

        const inputDate = new Date(filter.moveInEarliest);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return inputDate <= today;
    }

    const headerSubTitle = (
        `${filter.moveInEarliest ? todaysDateGreaterThanFilter() ? 'Ready to move!' : 'Ready by ' + filter.moveInEarliest : 'No move-in date selected'}`
    )


    return (
        <>
            <div className={`filter-box ${activeCondition && "selected"}`}>

                <FilterHeader
                    headerTitle={'Move in'}
                    headerSubTitle={headerSubTitle}
                    activeCondition={activeCondition}
                    onClick={() => {reveal === "MOVEIN" ? setReveal("NONE") : setReveal("MOVEIN"); window.scrollTo({ top: 320, behavior: 'smooth' })}}
                    icon={moveInIcon}
                />

                {reveal === "MOVEIN" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            Earliest move-in date

                            <div style={{ height: "8px" }} />

                            <div>
                                <button
                                    className="toggle button"
                                    onClick={() => {
                                        let today = new Date();
                                        let yyyy = today.getFullYear();
                                        let mm = String(today.getMonth() + 1).padStart(2, '0');  // January is 0!
                                        let dd = String(today.getDate()).padStart(2, '0');

                                        let formattedDate = `${yyyy}-${mm}-${dd}`;

                                        setFilter({ ...filter, moveInEarliest: formattedDate })
                                    }}
                                    style={{ width: "100%", height: "40px", backgroundColor: todaysDateGreaterThanFilter() ? "rgb(0, 242, 196)" : "white", color: todaysDateGreaterThanFilter() && "black" }}
                                >
                                    Ready to move!
                                </button>
                            </div>

                            <div style={{ margin: "8px 0px" }}>or ready to move by:</div>

                            <input
                                type="date"
                                value={handleValue('moveInEarliest')}
                                onChange={(e) => setFilter({ ...filter, moveInEarliest: e.target.value })}
                                style={{ width: "100%", fontFamily: "sans-serif", padding: "16px", fontSize: "24px", opacity: todaysDateGreaterThanFilter() ? "0.5" : "1" }}
                            />

                            <div style={{ height: "8px" }} />

                            <div>
                                <button
                                    className="secondary button"
                                    onClick={() => setFilter({ ...filter, moveInEarliest: null })}
                                    style={{ width: "100%", height: "40px" }}
                                >
                                    Clear
                                </button>
                            </div>

                            <div style={{ height: "40px" }} />
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default MoveIn;