import { useState, useEffect } from 'react';
import useFilterString from './useFilterString';

function useGetUnlimitedNotes(filter) {

    const [unlimitedNotes, setUnlimitedNotes] = useState(0)
    // const [processed, setProcessed] = useState(false)

    if (!filter) return

    useEffect(() => {
        async function getNotes() {
            const filterString = useFilterString(filter, null, null)

            const res = await fetch(`/api/notes/filter/${filterString}`);
            const { data } = await res.json();
            setUnlimitedNotes(data.length)
        }
        getNotes()
    }, [filter])



    // setTimeout(() => {
    //     setProcessed(true)
    // }, 4000)

    // if (processed) {
    return unlimitedNotes;
    // } else {
    //     return "...";
    // }
}

export default useGetUnlimitedNotes