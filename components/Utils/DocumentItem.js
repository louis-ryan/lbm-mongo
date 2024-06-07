import React from "react";
import { Oval } from 'react-loader-spinner';
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set the workerSrc globally
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DocumentItem = ({ field, arr, docHover, uploading, confirmDelete, setConfirmDelete, setDocHover, handleDeleteDoc, handleFileUpload }) => {

    if (confirmDelete.field === field) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8px", marginBottom: "24px", width: "100%", backgroundColor: "#A06B69", borderRadius: "4px" }}>
                <div style={{ height: "110px", display: "flex", alignItems: "center", color: "white" }}>
                    <div>{"Are you sure you want to delete this document?"}</div>
                    <div style={{ width: "16px" }} />
                    <div style={{ cursor: "pointer", fontWeight: "800" }} onClick={() => { setConfirmDelete({ field: "", idx: null, id: null }); setDocHover({ field: "", idx: null }) }}>{"Cancel"}</div>
                    <div style={{ width: "16px" }} />
                    <div style={{ cursor: "pointer", fontWeight: "800" }} onClick={() => { handleDeleteDoc(confirmDelete.id); setDocHover({ field: "", idx: null }) }}>{"Delete"}</div>
                </div>
            </div>
        )
    }


    return (
        <div style={{ display: "flex", marginTop: "8px", marginBottom: "24px" }}>
            {arr.map((doc, idx) => {
                if (doc.type === "img") {
                    if (docHover.field === field && docHover.idx === idx) {
                        return (
                            <div key={idx} className="document-input" onClick={() => { setConfirmDelete({ field: field, idx: idx, id: doc._id }) }} onMouseLeave={() => setDocHover({ field: "", idx: null })} style={{ backgroundColor: "#A06B69", display: "flex", justifyContent: "center", alignItems: "center", border: "none" }} >
                                <div>
                                    <div style={{ color: "white" }}>{"Delete"}</div>
                                    <div style={{ color: "white", maxWidth: "40px", maxHeight: "40px", overflow: "hidden" }}>{doc.fileName}</div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <img key={idx} className="document-input" src={doc.url} alt="Uploaded file" onMouseEnter={() => setDocHover({ field: field, idx: idx })} />
                        )
                    }
                }

                if (doc.type === "pdf" && doc.previewUrl) {
                    if (docHover.field === field && docHover.idx === idx) {
                        return (
                            <div key={idx} className="document-input" onClick={() => { setConfirmDelete({ field: field, idx: idx, id: doc._id }) }} onMouseLeave={() => setDocHover({ field: "", idx: null })} style={{ backgroundColor: "#A06B69", display: "flex", justifyContent: "center", alignItems: "center", border: "none" }}>
                                <div>
                                    <div style={{ color: "white" }}>{"Delete"}</div>
                                    <div style={{ color: "white", maxWidth: "40px", maxHeight: "40px", overflow: "hidden" }}>{doc.fileName}</div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <img key={idx} className="document-input" src={doc.previewUrl} alt="PDF Preview" onMouseEnter={() => setDocHover({ field: field, idx: idx })} />
                        )
                    }
                }
            })}

            {arr.length < 6 && (
                uploading === field ? (
                    <div className="document-input" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Oval visible={true} height="40" width="40" color="white" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" />
                    </div>
                ) : (
                    <>
                        <input id={`file-input-${field}`} type="file" accept="image/*,application/pdf" onChange={(e) => { handleFileUpload(e, field); console.log("field from onChange: ", field) }} style={{ width: "0px", height: "0px", position: "absolute", opacity: "0" }} />
                        <label
                            htmlFor={`file-input-${field}`}
                            className="document-input"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <h2>{"+"}</h2>
                        </label>
                    </>
                )
            )}
        </div>
    );

};

export default DocumentItem;
