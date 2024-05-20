import React, { useState, useEffect } from "react";
import DocumentItem from './DocumentItem';
import axios from "axios";
import { Tooltip } from 'react-tooltip'
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set the workerSrc globally
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ContactModal = ({ setDocumentsShowing, user }) => {
    const [overModal, setOverModal] = useState(false);

    const [idArr, setIdArr] = useState([]);
    const [poiArr, setPoiArr] = useState([]);
    const [rrArr, setRrArr] = useState([]);

    const [docHover, setDocHover] = useState({ field: "", idx: null });
    const [uploading, setUploading] = useState("");
    const [confirmDelete, setConfirmDelete] = useState({ field: "", idx: null, id: null })

    const handleDocumentDownload = async () => {
        try {
            const res = await fetch(`/api/users/documents/mine/${user.sub}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });

            const body = await res.json();

            let newIdArr = [];
            let newPoiArr = [];
            let newRrArr = [];

            body.data.forEach((doc) => {
                if (doc.field === "ID") { newIdArr.push(doc) }
                if (doc.field === "POI") { newPoiArr.push(doc) }
                if (doc.field === "RR") { newRrArr.push(doc) }
            });

            setIdArr(newIdArr);
            setPoiArr(newPoiArr)
            setRrArr(newRrArr)

            setUploading("");
        } catch (error) {
            console.log("existing document err: ", error);
        }
    };

    const handleDocumentUpload = async (docObj) => {
        try {
            await fetch("/api/users/documents", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    userId: user.sub,
                    field: docObj.field,
                    type: docObj.type,
                    url: docObj.url,
                    previewUrl: docObj.previewUrl,
                }),
            });
            handleDocumentDownload();
        } catch (error) {
            console.log("existing document err: ", error);
        }
    };

    const handleFileUpload = async (event, field) => {
        const selectedFile = event.target.files[0];
        const filename = `newUserDoc_${Date.now()}`;

        setDocHover({ field: "", idx: null })

        setUploading(field)

        try {
            const response = await axios.get(`/api/upload?file=${filename}`);
            const { url, fields } = response.data;

            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("file", selectedFile);

            await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const fileUrl = `https://leasebreakersmelbourne.s3.eu-central-1.amazonaws.com/${fields.key}`;

            let previewUrl = null;
            if (selectedFile.type.includes("pdf")) {
                previewUrl = await generatePdfPreview(selectedFile);
            }

            handleDocumentUpload({
                field: field,
                url: fileUrl,
                type: selectedFile.type.includes("pdf") ? "pdf" : "img",
                previewUrl: previewUrl,
            });

            console.log("File uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const generatePdfPreview = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const pdf = await pdfjs.getDocument({ data: new Uint8Array(reader.result) }).promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: 1 });
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: context, viewport: viewport }).promise;
                    resolve(canvas.toDataURL());
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const handleDeleteDoc = async (id) => {
        console.log("deleting: ", id)
        setDocHover({ field: "", idx: null })
        try {
            await fetch(`/api/users/documents/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });
            handleDocumentDownload();
        } catch (error) {
            console.log("existing document err: ", error);
        }
        setConfirmDelete({ field: "", idx: null, id: null })
    }

    useEffect(() => {
        handleDocumentDownload();
    }, []);

    return (
        <>
            <div className="dark-background" />
            <div className="clickable-container" onClick={() => { if (!overModal) { setDocumentsShowing(false); } }}>
                <div className="info-box" onMouseEnter={() => setOverModal(true)} onMouseLeave={() => setOverModal(false)}>

                    <h2>{"Transfer Documents"}</h2>

                    <div >{"These documents are what the property lister sees when you apply directly for a property. They may also share them with their landlord so only include what you are comfortable sharing."}</div>

                    <div style={{ height: "16px" }} />

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{"IDENTIFICATION"}</div>
                        <div style={{ width: "4px" }} />
                        <a data-tooltip-id="id-tooltip" data-tooltip-content="This can be an driver's licence or passport photo. 100 points of valid ID is best.">ℹ️</a>
                        <Tooltip id="id-tooltip" />
                    </div>

                    <DocumentItem field={"ID"} arr={idArr} docHover={docHover} uploading={uploading} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} setDocHover={setDocHover} handleDeleteDoc={handleDeleteDoc} handleFileUpload={handleFileUpload} />

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{"PROOF OF INCOME"}</div>
                        <div style={{ width: "4px" }} />
                        <a data-tooltip-id="poi-tooltip" data-tooltip-content="Some recent payslips from you employer will demonstrate that you can meet the cost of rent.">ℹ️</a>
                        <Tooltip id="poi-tooltip" />
                    </div>

                    <DocumentItem field={"POI"} arr={poiArr} docHover={docHover} uploading={uploading} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} setDocHover={setDocHover} handleDeleteDoc={handleDeleteDoc} handleFileUpload={handleFileUpload} />

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{"RENTAL REFERENCES"}</div>
                        <div style={{ width: "4px" }} />
                        <a data-tooltip-id="rr-tooltip" data-tooltip-content="If you can get some positive references from times you have been a tenant, it can help establish trust.">ℹ️</a>
                        <Tooltip id="rr-tooltip" />
                    </div>

                    <DocumentItem field={"RR"} arr={rrArr} docHover={docHover} uploading={uploading} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} setDocHover={setDocHover} handleDeleteDoc={handleDeleteDoc} handleFileUpload={handleFileUpload} />
                </div>
            </div>
        </>
    );
};

export default ContactModal;
