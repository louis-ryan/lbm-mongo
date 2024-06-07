const ApplicationPanel = ({ docArrForApply, docArrNotInc, handleRemoveDocForApply, handleDocumentDownload, uploadApplication, setContactsShowing, setDocumentsShowing, userContacts }) => {


    return (
        <div>
            {docArrNotInc.length > 0 && (
                <>
                    <div style={{ margin: "24px 0px" }}>{"DOCS NOT INCLUDED"}</div>
                    <div onClick={() => handleDocumentDownload()} className="button secondary" style={{ height: "40px", fontWeight: "200" }}>{`${docArrNotInc.length} document(s) not included. RESET?`}</div>
                </>
            )}

            <div style={{height: "8px"}}/>

            <div style={{ padding: "16px", border: "1px solid grey", borderRadius: "8px" }}>

                <h2>{"Application"}</h2>

                <div style={{ height: "24px" }} />

                <div style={{ marginBottom: "16px" }}>{"DOCS INCLUDED"}</div>

                {docArrForApply.map((doc) => (
                    <div key={doc._id} style={{ display: "flex", justifyContent: "space-between", border: "1px solid lightgrey", padding: "8px", marginBottom: "2px", borderRadius: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div>
                                <img src={doc.type === 'pdf' ? doc.previewUrl : doc.url} alt="doc image" style={{ height: "40px", width: "30px" }} />
                            </div>
                            <div style={{ width: "8px" }} />
                            <div>
                                {doc.field === 'ID' && "IDENTIFICATION"}
                                {doc.field === 'POI' && "PROOF OF INCOME"}
                                {doc.field === 'RR' && "RENTAL REFERENCE"}
                            </div>
                            <div style={{ width: "24px" }} />
                            <div style={{ textWrap: "nowrap", maxWidth: "240px", overflow: "hidden" }}>
                                {doc.fileName}
                            </div>
                        </div>

                        <div onClick={() => handleRemoveDocForApply(doc, docArrForApply)} style={{ display: "flex", alignItems: "center" }}>
                            {"REMOVE"}
                        </div>
                    </div>
                ))}

                <div style={{ height: "8px" }} />

                <div className="button secondary" onClick={() => setDocumentsShowing(true)} style={{ height: "40px", fontWeight: "200" }}>
                    {"+ ADD DOCUMENTS"}
                </div>

                <div style={{ height: "32px" }} />

                <div style={{ marginBottom: "16px" }}>{"YOUR CONTACT DETAILS"}</div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "24%", border: "1px solid lightgrey", padding: "16px", borderRadius: "4px" }}>
                        <div>{"NAME:"}</div>
                        <div style={{ height: "8px" }} />
                        <div>{userContacts.name}</div>
                    </div>

                    <div style={{ width: "24%", border: "1px solid lightgrey", padding: "16px", borderRadius: "4px" }}>
                        <div>{"EMAIL:"}</div>
                        <div style={{ height: "8px" }} />
                        <div>{userContacts.email}</div>
                    </div>

                    <div style={{ width: "24%", border: "1px solid lightgrey", padding: "16px", borderRadius: "4px" }}>
                        <div>{"PHONE:"}</div>
                        <div style={{ height: "8px" }} />
                        <div>{userContacts.phone}</div>
                    </div>

                    <div style={{ width: "24%", border: "1px solid lightgrey", padding: "16px", borderRadius: "4px" }}>
                        <div>{"SOCIAL:"}</div>
                        <div style={{ height: "8px" }} />
                        <div>{userContacts.social}</div>
                    </div>
                </div>

                <div style={{ height: "8px" }} />

                <div className="button secondary" onClick={() => setContactsShowing(true)} style={{ height: "40px", fontWeight: "200" }}>
                    {"EDIT CONTACTS"}
                </div>

                <div style={{ height: "32px" }} />

                {/* <div style={{ marginBottom: "16px" }}>{"MESSAGE TO THE LEASE BREAKER"}</div>

                <textarea style={{ border: "1px solid lightgrey", width: "100%", fontSize: "16px", color: "grey" }} />

                <div style={{ height: "8px" }} /> */}

                <div className="button secondary" onClick={() => uploadApplication()}>
                    {"SUBMIT APPLICATION"}
                </div>
            </div>
        </div>
    );
}



export default ApplicationPanel;
