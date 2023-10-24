import { useEffect, useState } from 'react';
import Location from './Location'
import Type from './PropertyType'
import Rent from './Rent'
import Rooms from './Rooms'
import Details from './Details'
import MoveIn from './MoveIn'
import UpdateFilterButton from './UpdateFilterButton';


const SortOptions = ({ deviceSize, reveal, setReveal, filter }) => (
    <div style={{ width: "100%", padding: "8px", display: "flex", fontWeight: "600", justifyContent: "space-between", fontSize: deviceSize === "MOBILE" && "20px" }}>

        {deviceSize === "DESKTOP" && (<div>{"Filtering options"}</div>)}

        <div className="sort-by-button" style={{ display: "flex" }}>
            <div onClick={() => { if (reveal !== "SORT") { setReveal("SORT") } else { setReveal("") } }}>
                {`Sort by: ${filter.notesOrder ? filter.notesOrder : "Created (asc)"}`}
            </div>
            <div style={{ marginLeft: "4px", transform: reveal === "SORT" ? "" : "rotate(180deg)" }}>∆</div>
        </div>
    </div>
)


const FilterSpace = () => (<div style={{ height: "8px" }} />)


const FilterComp = ({ filter, lastFilterFromServer, setFilter, updateFilter, deleteFilter, filterUpdating, notes, rentProps, deviceSize, notesOrder, setNotesOrder }) => {

    const [reveal, setReveal] = useState("NONE")
    const [canBeUpdated, setCanBeUpdated] = useState(false)



    const selectOrderOption = (option) => {
        setFilter({ ...filter, notesOrder: option })
        setReveal("")
    }

    useEffect(() => {
        function deepEqual(obj1, obj2) {
            if (obj1 === obj2) {
                return true; // identical references
            }

            // Ensure both are objects and not null
            if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
                return false;
            }

            // Handle arrays
            if (Array.isArray(obj1) && Array.isArray(obj2)) {
                if (obj1.length !== obj2.length) {
                    return false; // different lengths means they are not identical
                }
                for (let i = 0; i < obj1.length; i++) {
                    if (!deepEqual(obj1[i], obj2[i])) {
                        return false;
                    }
                }
                return true; // arrays are identical
            }

            // If only one of them is an array, they are not equal
            if (Array.isArray(obj1) || Array.isArray(obj2)) {
                return false;
            }

            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);

            // If they don't have the same number of keys, they're not equal
            if (keys1.length !== keys2.length) {
                return false;
            }

            for (let key of keys1) {
                if (!keys2.includes(key)) {
                    return false;  // key doesn't exist in obj2
                }

                if (!deepEqual(obj1[key], obj2[key])) {
                    return false;  // values are not equal
                }
            }

            return true;
        }

        if (deepEqual(filter, lastFilterFromServer)) {
            setCanBeUpdated(false)
        } else {
            setCanBeUpdated(true)
        }
    })


    return (
        <div style={{ marginTop: "24px", borderRadius: "8px", }}>

            <div style={{ height: "16px" }} />

            <SortOptions deviceSize={deviceSize} reveal={reveal} setReveal={setReveal} filter={filter} />

            {reveal === "SORT" && (
                <div style={{ fontSize: deviceSize === "MOBILE" && "20px", marginTop: "16px" }}>
                    <div onClick={() => selectOrderOption("Contract (desc)")} className="order-option"><div>{"Time left on Contract"}</div><div>{"(Descending)"}</div></div>
                    <div onClick={() => selectOrderOption("Contract (asc)")} className="order-option"><div>{"Time left on Contract"}</div><div>{"(Ascending)"}</div></div>
                    <div onClick={() => selectOrderOption("Created (desc)")} className="order-option"><div>{"Date created"}</div><div>{"(Descending)"}</div></div>
                    <div onClick={() => selectOrderOption("Created (asc)")} className="order-option"><div>{"Date created"}</div><div>{"(Ascending)"}</div></div>
                </div>
            )}

            <div style={{ height: "24px" }} />

            <Location reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <FilterSpace />

            <Type reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <FilterSpace />

            <Rent reveal={reveal} setReveal={setReveal} filter={filter} setFilter={setFilter} rentProps={rentProps} />

            <FilterSpace />

            <Rooms reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <FilterSpace />

            <Details reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <FilterSpace />

            <MoveIn reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <FilterSpace />

            {canBeUpdated && (<UpdateFilterButton updateFilter={updateFilter} filterUpdating={filterUpdating} filter={filter} />)}

            {deviceSize === "MOBILE" && (<div style={{ height: "120px" }} />)}
        </div>
    )
}

export default FilterComp;