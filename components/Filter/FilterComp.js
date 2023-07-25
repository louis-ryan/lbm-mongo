import { useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import Location from './Location'
import Rent from './Rent'
import Rooms from './Rooms'
import Details from './Details'
import MoveIn from './MoveIn'


const FilterComp = ({ filter, lastFilterFromServer, setFilter, updateFilter, deleteFilter, filterUpdating, notes, rentProps, deviceSize }) => {

    const [reveal, setReveal] = useState("NONE")


    return (
        <div style={{ marginTop: "24px", borderRadius: "8px", }}>

            <div style={{ height: "16px" }} />

            <div style={{ width: "100%", padding: "8px" }}>
                <div>{"Selecting filtering options"}</div>
            </div>

            <div style={{ height: "24px" }} />

            <Location reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <Rent reveal={reveal} setReveal={setReveal} filter={filter} setFilter={setFilter} rentProps={rentProps} />

            <div style={{ height: "8px" }} />

            <Rooms reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <Details reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <MoveIn reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            {filter.userEmail === null ? (
                <p style={{ fontSize: "12px", padding: "8px" }}>{"You currently have NO filter saved and will not recieve emails about new properties"}</p>
            ) : (
                <p style={{ fontSize: "12px", padding: "8px" }}>{"You have a filter saved and may recieve emails. Click 'DELETE MY STORED FILTER' to stop all emails."}</p>
            )}

            {lastFilterFromServer !== filter && (

                <div>
                    <div
                        className='update-filter-button'
                        onClick={() => { updateFilter() }}
                    >
                        {filterUpdating === "UPDATE" && (
                            <div style={{ padding: "4px", fontSize: "16px" }}>
                                {filter.userEmail === null ? (
                                    "CREATE FILTER"
                                ) : (
                                    "UPDATE MY FILTER"
                                )}
                            </div>
                        )}

                        {filterUpdating === "UPDATING" && (
                            <div style={{ filter: "saturate(0) brightness(1.5)" }}>
                                <Blocks
                                    height="24"
                                    width="24"
                                    color="pink"
                                    radius="0"
                                    wrapperClassName="blocks-loader-ani"
                                />
                            </div>
                        )}

                        {filterUpdating === "DONE" && (
                            <svg width="24px" height="24px" viewBox="0 0 40 40" version="1.1">
                                <g id="Tick" stroke="none" strokeWidth="4" fill="none" fillRule="evenodd">
                                    <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                                    <polyline id="Line-11" stroke="#FFFFFF" strokeLinecap="round" points="30.5 11 17.5 29 10 23"></polyline>
                                </g>
                            </svg>
                        )}

                    </div>
                </div>

            )}

            {filter.userEmail !== null && (
                <div style={{ padding: "8px" }}>
                    <div
                        onClick={() => { deleteFilter() }}
                        style={{ fontSize: "16px", fontWeight: "800px", textDecoration: "underline", color: "black", cursor: "pointer", width: "100%", textAlign: "center", padding: "16px", border: "2px solid black" }}
                    >
                        {"DELETE MY STORED FILTER"}
                    </div>
                    <div style={{ height: "40px" }} />
                </div>
            )}

        </div>
    )
}

export default FilterComp;