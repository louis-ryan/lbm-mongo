import ListingCard from './ListingCard';
import BrowseOptions from './BrowseOptions';


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
                <>
                    <div style={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "200px", width: "200px", borderRadius: "400px", overflow: "hidden" }}>
                            <img src={'giphy.webp'} alt="loading gif" style={{ margin: "16px", height: "100%", transform: "scale(1.2)", opacity: "0.8" }} />
                        </div>
                    </div>
                </>
            ) : (
                notes.length === 0 ? (
                    <div style={{ width: "100%", height: "480px", display: "flex", justifyContent: "center", alignItems: "center", padding: "80px" }}>
                        <div style={{ textAlign: "center" }}>
                            <h3>{"There are no listings in your search filter."}</h3>
                            <h3>{"You might have to broaden your search"}</h3>
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