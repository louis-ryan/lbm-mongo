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
        if (!user) { router.push("/api/auth/login"); return }

        await fetch(`api/filters/filter/${filter._id}`, {
            method: 'DELETE',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
        })
        setFilter(useGetInitialFilterObj())
        setLastFilterFromServer(useGetInitialFilterObj())
    }


    return {
        updateFilter: updateFilter,
        deleteFilter: deleteFilter
    }

}

export default useUpdateFilter