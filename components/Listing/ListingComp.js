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
            />

            <div style={{ height: "80px" }} />

        </div>
    )
}

export default ListingComp;