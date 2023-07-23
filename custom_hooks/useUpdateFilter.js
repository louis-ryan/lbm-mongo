import useFormatFilterBody from "./useFormatFilterBody";
import useGetInitialFilterObj from "./useGetInitialFilterObj";

function useUpdateFilter(user, router, setFilterUpdating, filter, setFilter, setLastFilterFromServer) {


    async function updateFilter() {

        if (!user) {
            router.push("/api/auth/login")
            return
        }

        setFilterUpdating("UPDATING")

        const body = useFormatFilterBody(filter, user)

        var req = {}

        if (filter._id) {
            req = {
                url: `api/filters/filter/${filter._id}`,
                method: 'PUT'
            }
        }
        else {
            req = {
                url: 'api/filters',
                method: 'POST'
            }
        }


        const res = await fetch(req.url, {
            method: req.method,
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const { data } = await res.json();

        setFilter(data)
        setLastFilterFromServer(data)
        setFilterUpdating("DONE")

        if (!data) return
        await fetch(`api/filters/filter/${data._id}/contact`)


    }



    async function deleteFilter() {


        async function updateRentFilter() {
            var rentArr = []
    
            const res = await fetch(`api/notes/rent`);
            const { data } = await res.json();
    
            data.map((rent) => {
                if (!rent) return
                rentArr.push(rent)
            })
            var sortedRentArr = rentArr.sort((a, b) => { return a - b })

            setFilter({
                ...filter,
                minRentVal: sortedRentArr[0],
                maxRentVal: sortedRentArr[sortedRentArr.length - 1],
                selectedRentVal: [sortedRentArr[0], sortedRentArr[sortedRentArr.length - 1]],
            })
        }


        if (!user) { router.push("/api/auth/login"); return }

        await fetch(`api/filters/filter/${filter._id}`, {
            method: 'DELETE',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
        })
        setFilter(useGetInitialFilterObj())
        setLastFilterFromServer(useGetInitialFilterObj())
        updateRentFilter()
    }




    return {
        updateFilter: updateFilter,
        deleteFilter: deleteFilter
    }

}

export default useUpdateFilter