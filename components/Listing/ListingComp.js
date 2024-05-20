import ListingCard from './ListingCard';
import BrowseOptions from './BrowseOptions';
import { Grid } from 'react-loader-spinner';


const ListingComp = ({ notes, getNotes, rendering, unlimitedNotes, skipping, setSkipping, getSkippedNotes, deviceSize }) => {


    return (
        <div style={{ width: "100%" }}>

            <div style={{ height: "40px" }} />

            <BrowseOptions
                getNotes={getNotes}
                unlimitedNotes={unlimitedNotes}
                skipping={skipping}
                setSkipping={setSkipping}
                getSkippedNotes={getSkippedNotes}
                deviceSize={deviceSize}
            />

            {rendering ? (
                <div style={{ width: "100%", height: "480px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img id="loading-ani" src={'LBM_logo.svg'} style={{ margin: "16px" }} />
                </div>
            ) : (
                notes.length === 0 ? (
                    <div style={{ width: "100%", height: "480px", display: "flex", justifyContent: "center", alignItems: "center", padding: "80px" }}>
                        <div>
                            <h2>{"There are no listings in your search filter."}</h2>
                            <h2>{"You might have to broaden your search"}</h2>
                        </div>
                    </div>
                ) : (
                    notes && notes.map((note, idx) => {
                        return (
                            <ListingCard
                                key={idx}
                                note={note}
                                rendering={rendering}
                                deviceSize={deviceSize}
                            />
                        )
                    })
                )
            )}

            <div style={{ height: "16px" }} />

            <BrowseOptions
                getNotes={getNotes}
                unlimitedNotes={unlimitedNotes}
                skipping={skipping}
                setSkipping={setSkipping}
                getSkippedNotes={getSkippedNotes}
                deviceSize={deviceSize}
            />

            <div style={{ height: "80px" }} />

        </div>
    )



}

export default ListingComp;