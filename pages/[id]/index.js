import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Details from '../../components/Note/Details';
import Photos from '../../components/Note/Photos';
import PhotosDesk from '../../components/Note/PhotosDesk';
import useWindowWidth from '../../custom_hooks/useWindowWidth';
import useGetNote from '../../custom_hooks/useGetNote';
import useRedirect from '../../custom_hooks/useRedirect';
import mapPath from '../../components/Creation/MapPath';
import DeleteModal from '../../components/Note/DeleteModal';
import apartmentIcon from '../../public/property_types/Apartment.svg';
import houseIcon from '../../public/property_types/House.svg';
import studentAccomIcon from '../../public/property_types/Student Accom.svg';
import townhouseIcon from '../../public/property_types/Townhouse.svg';
import ApplicationPanel from '../../components/Note/ApplicationPanel';
import AccessPremium from '../../components/Note/AccessPremium';
import MyListing from '../../components/Note/MyListing';
import newApplicationEmail from '../../components/Emails/NewApplication';


const desktopCont = { width: "100%", display: "flex", justifyContent: "center" }
const desktopComp = { width: "800px" }
const coverPic = { position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.5)", opacity: "1" }

const CoverPicDesk = ({ pic }) => (
    <div style={coverPic}>
        {pic ? (<img src={pic.url} alt="cover photo" style={{ width: "100%", filter: "blur(6px)", transform: "scale(1.1)" }} />) : (<img src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w" alt="cover photo" style={{ width: "100%", filter: "blur(6px)", transform: "scale(1.1)" }} />)}
    </div>
)

const Note = (props) => {

    const latInit = -37.1989648128
    const longInit = 144.340643773
    const onePixLat = 0.00097731799
    const onePixLong = 0.0012070086

    const [mapCoords, setMapCoords] = useState({})

    const windowWidth = useWindowWidth()
    const { user } = useUser()
    const router = useRouter()
    const { note } = useGetNote(router)

    const [pageLoaded, setPageLoaded] = useState(false)

    const [propertyType, setPropertyType] = useState({ name: "", img: null })

    const [applyPanel, setApplyPanel] = useState(false)

    const [overModal, setOverModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [contactDetails, setContactDetails] = useState({ name: "", email: "", phone: "", social: "" })

    const [docArrForApply, setDocArrForApply] = useState([]);
    const [docArrNotInc, setDocArrNotInc] = useState([]);

    const [userContacts, setUserContacts] = useState({});

    const [applicationExists, setApplicationExists] = useState(false)
    const [applicationSubmitted, setApplicationSubmitted] = useState(false)

    useRedirect(note, user, router)

    var latInPx = (latInit - mapCoords.lat) / onePixLat
    var longInPx = (mapCoords.long - longInit) / onePixLong


    const handleCheckStatus = async () => {
        const response = await fetch(`/api/tier/${user.email}`);
        const data = await response.json();
        console.log("data: ", data)
        // props.setPaymentStatus(data.status);
        props.setPaymentStatus("succeeded");
    };


    const getApplicationSentBool = async () => {
        try {
            const res = await fetch(`api/applications/byMe/${user.sub}/thisNote/${note._id}/hasSent`, {
                method: 'GET'
            })
            const { youHaveApplied } = await res.json()

            setApplicationExists(youHaveApplied)
            setPageLoaded(true)

        } catch (error) {
            console.log("application exists error: ", error);
        }
    }


    const formatApplicantDocuments = () => {

        let applicantDocs = []

        docArrForApply.map((doc) => {
            applicantDocs.push({
                fileName: doc.fileName,
                field: doc.field,
                type: doc.type,
                url: doc.url,
                previewUrl: doc.previewUrl ? doc.previewUrl : doc.url
            })
        })

        return applicantDocs
    }


    const sendEmailToBreaker = async (urlForEmail) => {

        console.log("url: ", urlForEmail)

        console.log("new appl: ", newApplicationEmail(note, user, urlForEmail))

        const content =

            `<img src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/99125cab-df14-4af4-bead-55b272b9cb62/LBM+Copy+3.png?format=2500w" width="120px"/>` +

            `<h2>You have a new application to your property in ${note.address}</h2>` +

            `<table width="100%" border="0" cellspacing="0" cellpadding="0"> ` +
            `<tr> ` +

            `<td>` +

            `<td>` +

            `<td> ` +
            `<div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden;">` +
            `<img src="${user.picture}" width="60px" height="60px"/>` +
            `</div>` +
            `</td>` +

            `<td> ` +
            `<div style="position: absolute; right: 0px; margin-bottom: 40px;">` +
            `<div style="height: 20px;"/>` +
            `<h3>Application from</h3>` +
            `<h3>${user.name}</h3>` +
            `</div>` +
            `</td> ` +
            ` </tr>` +
            `</table> ` +

            `<div>` +
            `To see this most recent application, simply click the button below` +
            `</div>` +

            `<a href="${urlForEmail}/${note._id}">` +
            `<div style="width: 100%; padding: 24px; background-color: black; color: white; text-align: center; text-decoration: none; cursor: pointer; margin-top: 40px;">` +
            `VIEW APPLICATION` +
            `</div>` +
            `</a>`




        await fetch('api/contact', {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                email: note.breakerEmail,
                subject: "Leasebreakers Melbourne: New Application for property!",
                content: content
            })
        })

    }


    const uploadApplication = async () => {

        const body = {
            applicantId: user.sub,
            applicantPic: user.picture,
            applicantName: userContacts.name,
            applicantEmail: userContacts.email,
            applicantPhone: userContacts.phone,
            applicantSocial: userContacts.social,
            applicantDocuments: formatApplicantDocuments(),
            applicantMessage: "helloooo",
            noteId: note._id,
            breakerId: note.breakerId,
            seenByBreaker: false
        }

        const res = await fetch('api/applications', {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const resJSON = await res.json();

        const urlForEmail = resJSON.data

        setApplicationSubmitted(true)
        sendEmailToBreaker(urlForEmail)

    }


    const checkForExistingContact = async () => {
        if (!user) return
        try {
            const res = await fetch(`api/users/contacts/mine/${user.sub}`, {
                method: 'GET'
            })
            const { data } = await res.json()
            setUserContacts({
                name: data.userName,
                email: data.userEmail,
                phone: data.userPhone,
                social: data.userSocial
            })
        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    const handleRemoveDocForApply = (doc, arr) => {

        let newIncArr = []
        let newRemArr = []

        arr.forEach((item) => {
            if (item.fileName !== doc.fileName) {
                newIncArr.push(item)
            } else {
                newRemArr.push(item)
            }
        })

        setDocArrForApply(newIncArr)
        setDocArrNotInc([...docArrNotInc, ...newRemArr])
    }


    const handleDocumentDownload = async () => {

        if (!user) return

        try {
            const res = await fetch(`/api/users/documents/mine/${user.sub}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });

            const body = await res.json();

            setDocArrForApply(body.data)

            setDocArrNotInc([])

        } catch (error) {
            console.log("existing document err: ", error);
        }
    };


    async function getContactDetails() {
        try {
            const res = await fetch(`api/users/contacts/breaker/${note.breakerId}`, { method: 'GET' })
            const { data } = await res.json()

            setContactDetails({ name: data.userName, email: data.userEmail, phone: data.userPhone, social: data.userSocial })
        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }

    useEffect(() => {
        if (!user) return
        if (!props) return
        handleCheckStatus()
    }, [props, user])


    useEffect(() => {
        if (!note) return
        getContactDetails()
        if (!user) return
        getApplicationSentBool()
    }, [user, note])


    useEffect(() => {
        if (props.contactsShowing) return
        checkForExistingContact()
    }, [props.contactsShowing, user])


    useEffect(() => {
        if (props.documentsShowing) return
        handleDocumentDownload()
    }, [props.documentsShowing, user]);


    useEffect(() => {
        checkForExistingContact()
    }, [props.contactsShowing, user]);


    useEffect(() => {
        if (!note) return
        if (note.postCode < 3000) return

        async function getLocationsByZip() {
            const res = await fetch(`./postCodes.json?`);
            const data = await res.json()

            data.map((entry) => {
                if (entry.postcode !== note.postCode) return
                setMapCoords({ lat: entry.latitude, long: entry.longitude })
            })
        }
        getLocationsByZip()

    }, [note])


    useEffect(() => {
        if (!note) return

        switch (note.type) {
            case 'HOUSE': setPropertyType({ name: "House", img: houseIcon }); break;
            case 'APARTMENT': setPropertyType({ name: "Apartment", img: apartmentIcon }); break;
            case 'STUDENT': setPropertyType({ name: "Student accommodation", img: studentAccomIcon }); break;
            case 'TOWNHOUSE': setPropertyType({ name: "Townhouse", img: townhouseIcon }); break;
        }
    }, [note])



    if (!note) return
    if (!user) return
    if (windowWidth > 800 || !windowWidth) {
        return (
            <>
                <DeleteModal
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    overModal={overModal}
                    setOverModal={setOverModal}
                    id={note._id}
                    router={router}
                />

                <div style={desktopCont}>
                    <div style={desktopComp}>

                        <CoverPicDesk pic={note.pics[0]} />

                        <div style={{ height: "140px" }} />

                        {note.breakerId === user.sub ? (
                            <MyListing
                                user={user}
                                note={note}
                                setDeleteModal={setDeleteModal}
                                propertyType={propertyType}
                                paymentStatus={props.paymentStatus}
                            />
                        ) : (
                            <>

                                <h2 style={{ color: "white" }}>{propertyType.name} in {note.address}</h2>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                                        <img height="40px" width="40px" src={note && note.breakerPicture} alt="breaker picture" />
                                    </div>
                                    <div style={{ width: "16px" }} />
                                    <h3 style={{ color: "white" }}>Listed by {contactDetails.name}</h3>
                                </div>

                                <div style={{ height: "16px" }} />

                                {pageLoaded && (
                                    <>
                                        {applicationExists ? (
                                            <div style={{ padding: "16px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px", backgroundColor: "white", border: "1px solid lightgrey", borderRadius: "8px" }}>
                                                <div style={{ textAlign: "center" }}>
                                                    <h3>{"You have applied for this property!"}</h3>
                                                    <div>{`Hold tight until ${contactDetails.name} gets back to you.`}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='button primary' onClick={() => setApplyPanel((v) => !v)} style={{ height: "80px", width: "100%", fontSize: "16px" }}>
                                                {applyPanel ? "Property details" : "Apply for property"}
                                            </div>
                                        )}


                                        <div style={{ height: "24px" }} />

                                        {applyPanel ? (
                                            applicationSubmitted ? (
                                                <div style={{ height: "80px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px", backgroundColor: "white", border: "1px solid lightgrey", borderRadius: "8px" }}>
                                                    <h3>{"Application submitted"}</h3>
                                                </div>
                                            ) : (
                                                <ApplicationPanel
                                                    docArrForApply={docArrForApply}
                                                    setDocArrForApply={setDocArrForApply}
                                                    docArrNotInc={docArrNotInc}
                                                    setDocArrNotInc={setDocArrNotInc}
                                                    userContacts={userContacts}
                                                    handleRemoveDocForApply={handleRemoveDocForApply}
                                                    handleDocumentDownload={handleDocumentDownload}
                                                    uploadApplication={uploadApplication}
                                                    setContactsShowing={props.setContactsShowing}
                                                    setDocumentsShowing={props.setDocumentsShowing}
                                                    user={user}
                                                />
                                            )
                                        ) : (
                                            <>
                                                <PhotosDesk pics={note.pics} />

                                                <div style={{ height: "16px" }} />

                                                {props.paymentStatus !== "succeeded" ? (
                                                    <AccessPremium
                                                        user={user}
                                                        nameToContact={contactDetails.name}
                                                        noteId={note._id}
                                                    />
                                                ) : (
                                                    <div style={{ border: "1px solid lightgrey", borderRadius: "8px", padding: "16px", backgroundColor: "white" }}>
                                                        <h3>{`As a Full Access User, you can contact ${contactDetails.name} directly: `}</h3>

                                                        {
                                                            [
                                                                [contactDetails.name, "Name: "],
                                                                [contactDetails.phone, "Phone: "],
                                                                [contactDetails.email, "Email: "],
                                                                [contactDetails.social, "Facebook: "]
                                                            ]
                                                                .map((item, idx) => {
                                                                    return (
                                                                        <div key={idx} style={{ display: "flex", opacity: !item[0] && "0.5" }}>
                                                                            <h2>{item[1]}</h2>
                                                                            <div style={{ width: "80px" }} />
                                                                            <h1>{item[0] ? item[0] : "not provided"}</h1>
                                                                        </div>
                                                                    )
                                                                })
                                                        }

                                                    </div>
                                                )}

                                                <div style={{ height: "24px" }} />

                                                <Details
                                                    note={note}
                                                    mapPath={mapPath}
                                                    latInPx={latInPx}
                                                    longInPx={longInPx}
                                                    deviceSize={"DESKTOP"}
                                                />
                                            </>
                                        )}

                                    </>
                                )}
                            </>

                        )}

                        <div style={{ height: "120px" }} />
                    </div>
                </div >
            </>
        )
    }

    if (windowWidth <= 800) {
        return (
            <>

                <div 
                onClick={() => router.push('/')}
                style={{ position: "absolute", top: "0px", left: "0px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px" }}
                >
                    <h3>{"< BACK TO LISTINGS"}</h3>
                </div>

                <div style={{ padding: "8px" }}>

                    <div style={{ height: "80px" }} />

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                            <img height="40px" width="40px" src={note && note.breakerPicture} alt="breaker picture" />
                        </div>
                        <div style={{ width: "16px" }} />
                        <div>Listed by {contactDetails.name}</div>
                    </div>

                    <div style={{ height: "24px" }} />

                </div>

                <div style={{ height: "24px" }} />

                <Details
                    note={note}
                    mapPath={mapPath}
                    latInPx={latInPx}
                    longInPx={longInPx}
                    deviceSize={"MOBILE"}
                />

                <Photos pics={note.pics} />

                <div style={{ height: "120px" }} />

            </>

        )
    }
}

export default Note;