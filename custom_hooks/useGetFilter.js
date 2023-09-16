import { useEffect, useState } from 'react';
import useGetInitialFilterObj from './useGetInitialFilterObj';

function useGetFilter(user) {

    const [filter, setFilter] = useState(useGetInitialFilterObj())
    const [lastFilterFromServer, setLastFilterFromServer] = useState(useGetInitialFilterObj())
    const [mount, setMount] = useState(true)


    useEffect(() => {
        if (user === undefined) return
        if (!mount) return

        async function getFilter() {
            const res = await fetch(`api/filters/user/${user.sub}`)
            const { data } = await res.json();

            console.log("data: ", data)

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
    }
}


export default useGetFilter