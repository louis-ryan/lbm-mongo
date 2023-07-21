import { useEffect, useState } from 'react';
import useFilterString from './useFilterString';
import useGetInitialFilterObj from './useGetInitialFilterObj';

function useGetFilter(user) {

    const [filter, setFilter] = useState(useGetInitialFilterObj())
    const [lastFilterFromServer, setLastFilterFromServer] = useState(useGetInitialFilterObj())
    const [mount, setMount] = useState(true)
    const [unlimitedNotes, setUnlimitedNotes] = useState(0)


    useEffect(() => {
        async function getNotesInt() {
            const filterString = useFilterString(filter, null, null)
    
            const res = await fetch(`/api/notes/filter/${filterString}/int`);
            const { data } = await res.json();
            setUnlimitedNotes(data)
        }
        getNotesInt()
    }, [filter])


    useEffect(() => {
        if (!user) return
        if (!mount) return

        async function getFilter() {
            const res = await fetch(`api/filters/user/${user.sub}`)
            const { data } = await res.json();

            if (typeof data !== 'object') return

            setFilter(data)
            setLastFilterFromServer(data)

        }

        getFilter()
        setMount(false)
    }, [user])



    return {
        filter: filter,
        lastFilterFromServer: lastFilterFromServer,
        setFilter: setFilter,
        setLastFilterFromServer: setLastFilterFromServer,
        unlimitedNotes: unlimitedNotes
    }
}


export default useGetFilter