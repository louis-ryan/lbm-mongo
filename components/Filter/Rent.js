import FilterHeader from "./FilterHeader";
import ReactSlider from 'react-slider'
import rentIcon from '../../public/filter_icons/Rent.svg';


const graphicStyle = { height: "72px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }


const RentFilter = ({ reveal, setReveal, filter, setFilter, rentProps }) => {


    const [graphicArr, highestFreq, activeCondition, setValCondition, selectedVal, setSelectedVal, minVal, maxVal] = rentProps

    return (
        <>
            <div className={`filter-box ${activeCondition && "selected"}`}>

                <FilterHeader
                    headerTitle={'Rent'}
                    headerSubTitle={`$${selectedVal[0]}pw to $${selectedVal[1]}pw`}
                    activeCondition={activeCondition}
                    onClick={() => {reveal === "RENT" ? setReveal("NONE") : setReveal("RENT"); ; window.scrollTo({ top: 172, behavior: 'smooth' })}}
                    icon={rentIcon}
                />

                {reveal === "RENT" &&
                    <>
                        <div style={{ padding: "16px" }}>

                            <div
                                style={{
                                    ...graphicStyle,
                                    opacity: graphicArr[1].rentVal === null ? "0" : "1",
                                    transition: "1s"
                                }}
                            >
                                {graphicArr.map((obj, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                width: `calc(100% / ${graphicArr.length})`,
                                                height: `calc((100% / ${highestFreq}) * ${obj.numberWithVal})`,
                                                background: "grey"
                                            }}
                                        />
                                    )
                                })}
                            </div>

                            <ReactSlider
                                className="slider"
                                thumbClassName="slider-thumb"
                                trackClassName="slider-track"
                                defaultValue={[minVal, maxVal]}
                                ariaLabel={['Leftmost thumb', 'Rightmost thumb']}
                                renderThumb={(props) => <div {...props}></div>}
                                pearling
                                minDistance={10}
                                onChange={(value) => { setSelectedVal(value) }}
                                value={selectedVal}
                                min={minVal}
                                max={maxVal}
                            />

                            <div style={{ height: "24px" }} />

                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <div>min: ${minVal}pw</div>
                                <div>max: ${maxVal}pw</div>
                            </div>

                            <div style={{ height: "48px" }} />

                            {setValCondition && (
                                <div
                                    className="button-action"
                                    onClick={() => {
                                        setFilter({
                                            ...filter,
                                            minRentVal: minVal,
                                            maxRentVal: maxVal,
                                            selectedRentVal: selectedVal,
                                        })
                                    }}
                                    style={{ width: "100%", display: "flex", justifyContent: "center", padding: "16px 0px", cursor: "pointer" }}
                                >
                                    <div>SET RANGE ${selectedVal[0]} - ${selectedVal[1]}</div>
                                </div>
                            )}

                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default RentFilter;