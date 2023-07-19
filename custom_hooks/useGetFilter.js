import { useEffect, useState } from 'react';
import useGetInitialFilterObj from './useGetInitialFilterObj';
import useFilterString from './useFilterString';

function useGetFilter(user) {

    const [filter, setFilter] = useState(useGetInitialFilterObj())
    const [lastFilterFromServer, setLastFilterFromServer] = useState(useGetInitialFilterObj())
    const [mount, setMount] = useState(true)
    const [unlimitedNotes, setUnlimitedNotes] = useState(0)
    const [initialised, setInitialised] = useState(false)


    async function getNotes(filter) {
        const filterString = useFilterString(filter, null, null)

        const res = await fetch(`/api/notes/filter/${filterString}/int`);
        const { data } = await res.json();
        setUnlimitedNotes(data)
    }

    useEffect(() => {
        if (!user) return
        if (!mount) return

        async function getFilter() {
            const res = await fetch(`api/filters/user/${user.sub}`)
            const { data } = await res.json();

            if (typeof data !== 'object') return

            setFilter(data)
            setLastFilterFromServer(data)
            getNotes(data)
            setInitialised(true)

        }

        getFilter()
        setMount(false)
    }, [user])


    useEffect(() => {
        if (!initialised) return
        getNotes(filter)
    }, [filter])

    useEffect(() => {
        if (user) return
        getNotes(filter)
    }, [])



    return {
        filter: filter,
        lastFilterFromServer: lastFilterFromServer,
        setFilter: setFilter,
        setLastFilterFromServer: setLastFilterFromServer,
        unlimitedNotes: unlimitedNotes
    }
}


export default useGetFilter