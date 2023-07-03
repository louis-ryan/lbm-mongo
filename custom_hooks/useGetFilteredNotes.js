import { useEffect, useState } from 'react';
import useFilterString from './useFilterString';

function useGetFilteredNotes(filter) {

    const [notes, setNotes] = useState(0)
    const [rendering, setRendering] = useState(false)
    const [filterUpdating, setFilterUpdating] = useState("UPDATE")
    const [skipping, setSkipping] = useState(0)

    if (!filter) return


    async function getSkippedNotes(numSkipped) {
        setRendering(true)
        const filterString = useFilterString(filter, 5, numSkipped)
        const res = await fetch(`api/notes/filter/${filterString}`);
        const { data } = await res.json();
        setNotes(data)
        setTimeout(() => { setFilterUpdating("UPDATE"); setRendering(false) }, 1000)
    }


    useEffect(() => {
        async function getNotes() {
            setRendering(true)
            const filterString = useFilterString(filter, 5, 0)
            const res = await fetch(`api/notes/filter/${filterString}`);
            const { data } = await res.json();
            setSkipping(0)
            setNotes(data)
            setTimeout(() => { setFilterUpdating("UPDATE"); setRendering(false) }, 1000)
        }
        getNotes()
    }, [filter])


    return {
        notes: notes,
        rendering: rendering,
        filterUpdating: filterUpdating,
        setFilterUpdating: setFilterUpdating,
        skipping: skipping,
        setSkipping: setSkipping,
        getSkippedNotes: getSkippedNotes
    };
}

export default useGetFilteredNotes