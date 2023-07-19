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

const darkBackground = { position: "fixed", width: "100vw", height: "108vh", zIndex: "600", backgroundColor: "black", marginTop: "-80px", opacity: "0.8" }

const clickableContainer = { position: "fixed", top: "0px", width: "100vw", height: "100vh", zIndex: "601", marginTop: "-80px", display: "flex", justifyContent: "center", alignItems: "center" }
const infoBox = { width: "600px", backgroundColor: "white", padding: "40px" }

const desktopCont = { width: "100%", display: "flex", justifyContent: "center" }
const desktopComp = { width: "920px", zoom: "0.8" }
const coverPic = { position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.25)", opacity: "0.8" }


const Note = () => {

    const latInit = -37.1989648128
    const longInit = 144.340643773
    const onePixLat = 0.00097731799
    const onePixLong = 0.0012070086

    const [mapCoords, setMapCoords] = useState({})

    const windowWidth = useWindowWidth()
    const { user } = useUser()
    const router = useRouter()
    const { note } = useGetNote(router)

    const [overModal, setOverModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [contactReveal, setContactReveal] = useState(false)
    const [contactView, setContactView] = useState("NONE")
    const [contactDetails, setContactDetails] = useState({
        email: "",
        phone: "",
        social: ""
    })

    useRedirect(note, user, router)

    var latInPx = (latInit - mapCoords.lat) / onePixLat
    var longInPx = (mapCoords.long - longInit) / onePixLong


    async function deleteNote() {
        try {
            const res = await fetch(`api/notes/${note._id}`, {
                method: 'DELETE'
            })
            const { success } = await res.json()
            if (success) {
                router.push("/")
            }

        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    async function getContactDetails() {
        try {
            const res = await fetch('api/users/contacts', {
                method: 'GET'
            })
            const { data } = await res.json()

            data.map((contact) => {
                if (contact.userId === note.breakerId) {
                    setContactDetails({
                        email: contact.userEmail,
                        phone: contact.userPhone,
                        social: contact.userSocial
                    })
                } else {
                    setContactDetails({
                        email: note.breakerEmail,
                        phone: "",
                        social: ""
                    })
                }
            })

        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    const tenSecondTimer = () => {
        setTimeout(function () {
            setContactView("CONTACT")
            getContactDetails()
        }, 10000); // Set delay for 10 seconds
    }


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



    if (!note) return
    if (!user) return
    if (windowWidth > 1200) {
        return (
            <>
                {deleteModal && (
                    <>
                        <div style={darkBackground} />
                        <div style={clickableContainer}
                            onClick={() => { if (!overModal) { setDeleteModal(false) } }}
                        >
                            <div style={infoBox}
                                onMouseEnter={() => setOverModal(true)}
                                onMouseLeave={() => setOverModal(false)}
                            >
                                <h2>{"Are you sure you want to delete this property?"}</h2>
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
                )}

                <div style={desktopCont}>
                    <div style={desktopComp}>
                        <div style={coverPic}>
                            <img src={note.pics[0].url} style={{ width: "100%", filter: "blur(2px)" }} />
                        </div>
                        <div style={{ height: "140px" }} />

                        {note.breakerId === user.sub ? (
                            <>
                                <h1 style={{ color: "white" }}>Your property in {note.address}</h1>
                                <div
                                    onClick={() => setDeleteModal(true)}
                                    style={{ padding: "16px", border: "1px solid red", color: "white", backgroundColor: "black", width: "240px", textAlign: "center", cursor: "pointer" }}
                                >
                                    DELETE PROPERTY
                                </div>
                                <div style={{ height: "16px" }} />
                            </>
                        ) : (
                            <>
                                <h1 style={{ color: "white" }}>Property in {note.address}</h1>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>  <img height="40px" width="40px" src={note && note.breakerPicture} alt="breaker picture" /></div>
                                    <div style={{ width: "16px" }} />
                                    <h2 style={{ color: "white", transform: "translateY(-12px)" }}>Listed by {note.breakerName}</h2>
                                </div>

                                <div
                                    style={{ width: "100%", background: "lightgray", display: "flex", justifyContent: "center", alignItems: "center", height: contactReveal ? "600px" : "80px", borderRadius: "8px", cursor: contactView !== "CONTACT" && "pointer", transition: "1s" }}
                                    onClick={() => {
                                        setContactReveal(true)
                                        if (contactView === "NONE") { setContactView("PROMO") }
                                        tenSecondTimer()
                                    }}
                                >
                                    {!contactReveal ? (
                                        <h4>{"Reveal Breaker's Contact Information"}</h4>
                                    ) : (
                                        contactView === "PROMO" ? (
                                            <div style={{ width: "90%", height: "90%", backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>

                                                <div style={{ position: "absolute", color: "blue", marginLeft: "720px", marginTop: "520px", fontSize: "16px", fontWeight: "800" }}>{"quick ad"}</div>

                                                <a
                                                    href="https://www.redbubble.com/i/throw-pillow/Surreal-Suburban-Landscape-by-billbayer89/148450601.5X2YF"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/67ac49fa-ce0b-414a-9859-b96968745ff5/throw_pillow_promo.png?format=2500w"
                                                        style={{ width: "100%" }}
                                                    />
                                                </a>
                                            </div>
                                        ) : (
                                            <div style={{ width: "60%", height: "60%", }}>

                                                <h1>{user.given_name}´s Contact Details</h1>

                                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                                    <h2>Email:</h2>
                                                    <h2>{contactDetails.email}</h2>
                                                </div>

                                                {contactDetails.phone && (
                                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                                        <h2>Phone:</h2>
                                                        <h2>{contactDetails.phone}</h2>
                                                    </div>
                                                )}

                                                {contactDetails.social && (
                                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                                        <h2>Social:</h2>
                                                        <h2>{contactDetails.social}</h2>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}

                                </div>
                                <div style={{ height: "8px", width: contactView === "NONE" ? "0%" : "100%", backgroundColor: "blue", transition: "linear 10s", borderRadius: "8px", marginTop: "4px", display: contactView === "CONTACT" && "none" }} />

                            </>
                        )}

                        <div style={{ height: "24px" }} />

                        <PhotosDesk
                            pics={note.pics}
                        />

                        <div style={{ height: "24px" }} />


                        <Details
                            note={note}
                            mapPath={mapPath}
                            latInPx={latInPx}
                            longInPx={longInPx}
                        />

                    </div>
                </div >
            </>
        )
    } else {
        return (

            <div style={{ width: "100vw", height: "calc(100vh - 114.5px)", backgroundColor: "darkgray", position: "fixed", top: "0px", overflow: "scroll" }}>
                <div style={{ marginTop: "40px", backgroundColor: "rgb(241, 241, 241)", borderRadius: "16px 16px 0px 0px", boxShadow: "0px 0px 52px 0px black" }}>

                    <div style={{ height: "24px" }} />
                    <div style={{padding: "8px"}}>
                        <h1>Property</h1>
                        <div>Listed by {note.breakerName}</div>
                    </div>

                    <div style={{ height: "24px" }} />

                    <Details
                        note={note}
                        mapPath={mapPath}
                        latInPx={latInPx}
                        longInPx={longInPx}
                    />

                    <Photos
                        pics={note.pics}
                    />

                </div >
            </div>

        )
    }
}

export default Note;