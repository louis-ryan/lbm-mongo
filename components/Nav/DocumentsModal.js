import React, { useState } from "react";
import DocumentsActions from "../Utils/DocumentsActions";

const DocumentsModal = ({ setDocumentsShowing, user }) => {
    const [overModal, setOverModal] = useState(false);

    return (
        <>
            <div className="dark-background" />
            <div className="clickable-container" onClick={() => { if (!overModal) { setDocumentsShowing(false); } }}>
                <div className="info-box" onMouseEnter={() => setOverModal(true)} onMouseLeave={() => setOverModal(false)}>

                    <h2>{"Transfer Documents"}</h2>

                    <div >{"These documents are what the property lister sees when you apply directly for a property. They may also share them with their landlord so only include what you are comfortable sharing."}</div>

                    <div style={{ height: "16px" }} />

                    <DocumentsActions user={user} />
                </div>
            </div>
        </>
    );
};

export default DocumentsModal;
