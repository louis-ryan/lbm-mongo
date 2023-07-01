import { useState, useEffect } from 'react';

const Details = ({ note }) => {

    return (
        <div style={{ padding: "8px", backgroundColor: "white", border: "1px solid grey", borderRadius: "8px", padding: "32px" }} >
            <div>
                Property Location:
                <h3>{note.address}, VIC</h3>
            </div>

            <div>
                Name of Breaker:
                <h3>{note.breakerName}</h3>
            </div>

            <div>
                Description:
                <h3>{note.description}</h3>
            </div>
        </div>
    )
}

export default Details;