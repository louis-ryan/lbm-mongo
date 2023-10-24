import { Blocks } from 'react-loader-spinner';


const UpdateFilterButton = ({ updateFilter, filterUpdating, filter }) => (
    <div className='update-filter-button' onClick={updateFilter}>
        {filterUpdating === "UPDATE" && (
            <div style={{ padding: "4px" }}>
                {filter.userEmail === null ? ("CREATE FILTER") : ("UPDATE MY FILTER")}
            </div>
        )}

        {filterUpdating === "UPDATING" && (
            <div style={{ filter: "saturate(0) brightness(1.5)" }}>
                <Blocks height="24" width="24" color="pink" radius="0" wrapperClassName="blocks-loader-ani" />
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
)

export default UpdateFilterButton;