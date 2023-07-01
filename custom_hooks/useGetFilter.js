import { useEffect, useState } from 'react';
import useGetInitialFilterObj from './useGetInitialFilterObj';

function useGetFilter(user) {

    const [filter, setFilter] = useState(useGetInitialFilterObj())
    const [mount, setMount] = useState(true)


    useEffect(() => {
        if (!user) return
        if (!mount) return

        async function getFilter() {
            const res = await fetch(`api/filters/user/${user.sub}`)
            const { data } = await res.json();

            if (typeof data !== 'object') return

            setFilter(data)
        }

        getFilter()
        setMount(false)
    }, [user])

    return {
        filter: filter,
        setFilter: setFilter
    }
}


export default useGetFilter