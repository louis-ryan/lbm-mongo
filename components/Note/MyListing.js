import { useState, useEffect } from 'react';
import AccessPremium from '../../components/Note/AccessPremium';
import MyListingNav from './MyListingNav';


const MyListing = ({ user, note, setDeleteModal, propertyType }) => {

    const [applications, setApplications] = useState([]);
    const [newApplications, setNewApplications] = useState([]);
    const [currentApplication, setCurrentApplication] = useState(0);


    const getFieldName = (field) => {
        if (field === 'ID') return "Identification"
        if (field === 'POI') return "Proof of Income"
        if (field === 'RR') return "Reference"
    }


    const setApplicationSeenToTrue = async (application) => {
        try {
            await fetch(`api/applications/${application._id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ seenByBreaker: true })
            })
        } catch (error) {
            console.log("setting application seen to true err: ", error);
        }

    }


    const getApplications = async () => {
        try {
            const res = await fetch(`api/applications/note/${note._id}`, {
                method: 'GET'
            })
            const { data } = await res.json()

            setApplications(data)

            let newApplicationsArr = []

            data.forEach((application) => {

                if (application.seenByBreaker === false) {
                    newApplicationsArr.push(application)
                    setApplicationSeenToTrue(application)
                }

            })

            setNewApplications(newApplicationsArr)


        } catch (error) {
            console.log("getting applications err: ", error);
        }
    }


    useEffect(() => {
        if (!note) return
        if (!user) return
        if (note.breakerId !== user.sub) return
        getApplications()
    }, [user, note])


    return (

        <>
            <h2 style={{ color: "white" }}>Your {propertyType.name.toLowerCase()} in {note.address}</h2>
            <div onClick={() => setDeleteModal(true)} style={{ padding: "16px", border: "1px solid red", color: "white", backgroundColor: "black", width: "240px", textAlign: "center", cursor: "pointer" }}>
                {"DELETE PROPERTY"}
            </div>

            <div style={{ height: "80px" }} />

            {newApplications.length > 0 && (
                <h2>{`You have ${newApplications.length} new applications!`}</h2>
            )}
            <h2>{`${applications.length} total applications`}</h2>

            <MyListingNav
                applications={applications}
                currentApplication={currentApplication}
                setCurrentApplication={setCurrentApplication}
            />

            <div style={{ height: "24px" }} />

            <div style={{ width: "100%", display: "flex", transform: `translateX(calc(1600px * ${currentApplication}))`, transition: "1s" }}>
                {applications.map((application, idx) => {

                    return (
                        <div key={idx} style={{ position: "absolute", width: "800px", transform: `translateX(calc(-1600px * ${idx}))`, zIndex: idx + 1, padding: "16px", border: "1px solid lightgrey", borderRadius: "4px", marginBottom: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                                    <img src={application.applicantPic} width="40px" height="40px" alt="applicant picture" />
                                </div>
                                <div style={{ width: "16px" }} />
                                <div>
                                    <h3>Application from {application.applicantName}</h3>
                                </div>
                            </div>

                            <div style={{ height: "16px" }} />

                            <h3>{`This application contains ${application.applicantDocuments.length} documents`}</h3>

                            <div style={{ display: "flex", flexWrap: "wrap" }}>

                                {application.applicantDocuments.map((doc, idx) => {

                                    return (
                                        <div key={idx} style={{ marginRight: "16px", overflow: "hidden" }}>
                                            <img src={doc.url} height="160px" width="120px" alt="doc image url" />
                                            <h3>{getFieldName(doc.field)}</h3>

                                            <div style={{ width: "120px", overflow: "hidden", height: "40px" }}>{doc.fileName}</div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div style={{ height: "8px" }} />

                            <div className="button secondary">{"DOWNLOAD ALL DOCUMENTS"}</div>

                            <div style={{ height: "24px" }} />


                            <AccessPremium
                                user={user}
                                nameToContact={application.applicantName}
                                noteId={note._id}
                            />

                            <div style={{ height: "24px" }} />

                            <h3>Contact {application.applicantName} by email</h3>

                            <div style={{ border: "1px solid grey", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h1>{application.applicantEmail}</h1>
                                <div>{"COPY"}</div>
                            </div>

                            <div style={{ height: "24px" }} />
                        </div>
                    )
                })}
            </div>

            <div style={{ height: "calc(100vh + 120px)" }} />

        </>
    )

}


export default MyListing;