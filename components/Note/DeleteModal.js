
const DeleteModal = ({ deleteModal, setDeleteModal, overModal, setOverModal, id, router }) => {

    async function deleteNote() {
        try {
            const res = await fetch(`api/notes/${id}`, { method: 'DELETE' })
            const { success } = await res.json()

            if (success) router.push("/")

        } catch (error) {
            console.log("deletion err: ", error);
        }
    }

    if (deleteModal) {
        return (
            <>
                <div className="dark-background" />
                <div className="clickable-container" onClick={() => { if (!overModal) { setDeleteModal(false) } }}>
                    <div className="info-box" onMouseEnter={() => setOverModal(true)} onMouseLeave={() => setOverModal(false)}>
                        <h3>{"Are you sure you want to delete this property?"}</h3>
                        <p>{"If you delete this property, you will not be able to recover it."}</p>
                        <div style={{ height: "24px" }} />
                        <div
                            onClick={() => deleteNote()}
                            style={{ width: "100%", textAlign: "center", padding: "16px", background: "black", color: "white", cursor: "pointer" }}
                        >
                            {"DELETE"}
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default DeleteModal;