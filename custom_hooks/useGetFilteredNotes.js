import { useEffect, useState } from 'react';
import useFilterString from './useFilterString';

function useGetFilteredNotes(filter) {

    const [notes, setNotes] = useState([])
    const [unlimitedNotes, setUnlimitedNotes] = useState(0)
    const [rendering, setRendering] = useState(false)
    const [filterUpdating, setFilterUpdating] = useState("UPDATE")
    const [skipping, setSkipping] = useState(0)
    const [initialised, setInitialised] = useState(false)

    if (!filter) return


    async function getNotesInt() {
        const filterString = useFilterString(filter, null, null)

        const res = await fetch(`/api/notes/filter/${filterString}/int`);
        const { data } = await res.json();
        setUnlimitedNotes(data)
    }


    async function getInitNotes() {
        setRendering(true)
        const filterString = useFilterString(filter, 5, 0)
        const res = await fetch(`api/notes/filter/${filterString}`);
        const { data } = await res.json();
        console.log("notes: ", data)
        setSkipping(0)
        setNotes(data)
        setTimeout(() => { setFilterUpdating("UPDATE"); setRendering(false) }, 1000)
        setInitialised(true)
    }


    async function getSkippedNotes(numSkipped) {
        setRendering(true)
        const filterString = useFilterString(filter, 5, numSkipped)
        const res = await fetch(`api/notes/filter/${filterString}`);
        const { data } = await res.json();
        setNotes(data)
        setTimeout(() => { setFilterUpdating("UPDATE"); setRendering(false) }, 1000)
    }




    useEffect(() => {
        getInitNotes()
        getNotesInt()
    }, [filter])


    return {
        notes: notes,
        unlimitedNotes: unlimitedNotes,
        rendering: rendering,
        filterUpdating: filterUpdating,
        setFilterUpdating: setFilterUpdating,
        skipping: skipping,
        setSkipping: setSkipping,
        getSkippedNotes: getSkippedNotes,
        initialised: initialised
    };
}

export default useGetFilteredNotes