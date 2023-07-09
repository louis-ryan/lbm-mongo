import { useEffect, useState } from 'react';
import useFilterString from './useFilterString';

function useGetFilteredNotes(filter, user) {

    const [notes, setNotes] = useState([])
    const [rendering, setRendering] = useState(false)
    const [filterUpdating, setFilterUpdating] = useState("UPDATE")
    const [skipping, setSkipping] = useState(0)
    const [initialised, setInitialised] = useState(false)

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
            setInitialised(true)
        }
        getNotes()
    }, [filter])


    // useEffect(() => {
    //     if (user) return
    //     async function getNotes() {
    //         const res = await fetch(`api/notes`);
    //         const { data } = await res.json();
    //         setNotes(data)
    //     }
    //     getNotes()
    // }, [])


    return {
        notes: notes,
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