function useNoteHandleEvents(form, setForm, post, setPost, setValidAddresses, setMapCoords, router, setErrors) {

    const createNote = async () => {
        try {
            const res = await fetch('api/notes', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            router.push("/");
            const resJSON = await res.json()
            if (res.status === 201) {
                const res = await fetch('api/filters/contact', {
                    method: 'POST',
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, _id: resJSON.data._id })
                })
                resJSON = await res.json()
            }
        } catch (error) {
            console.log("create note err: ", error);
        }
    }

    const handleSubmit = () => { createNote() }

    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    const handleRent = (e) => { setForm({ ...form, [e.target.name]: Number(e.target.value) }) }

    const handlePost = (e) => { setPost({ ...post, [e.target.name]: e.target.value }) }

    const handleMoveInDate = (val) => { setForm({ ...form, moveInDate: val }) }

    const handleContractEnds = (val) => { setForm({ ...form, contractEnds: val }) }

    const handleContractTerminates = (val) => { setForm({ ...form, contractTerminates: val }) }

    const handleAddress = (e) => { setForm({ ...form, address: e }) }

    const handleClearPost = () => {
        setPost({ postCode1: '', postCode2: '', postCode3: '', postCode4: '' });
        [1, 2, 3, 4].map((id) => document.getElementsByName(`postCode${id}`)[0].value = null);
        setValidAddresses([]);
        setMapCoords({});
        setErrors({ ...errors, address: null })
    }

    return [
        handleSubmit,
        handleChange,
        handleRent,
        handlePost,
        handleMoveInDate,
        handleContractEnds,
        handleContractTerminates,
        handleAddress,
        handleClearPost
    ]
}

export default useNoteHandleEvents