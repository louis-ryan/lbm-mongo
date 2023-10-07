import ListingCard from './ListingCard';
import BrowseOptions from './BrowseOptions';


const ListingComp = ({ notes, getNotes, rendering, unlimitedNotes, skipping, setSkipping, getSkippedNotes, deviceSize }) => {


    if (notes.length === 0) {
        return (
            <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                There are no listings in your search filter. You might have to broaden your search
            </div>
        )
    } else {
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

                {notes && notes.map((note, idx) => {
                    return (
                        <ListingCard
                            key={idx}
                            note={note}
                            rendering={rendering}
                            deviceSize={deviceSize}
                        />
                    )
                })}

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
}

export default ListingComp;