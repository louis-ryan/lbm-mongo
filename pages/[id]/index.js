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
import Action from '../../components/Note/Action';


const darkBackground = { position: "fixed", width: "100vw", height: "108vh", zIndex: "600", backgroundColor: "black", marginTop: "-80px", opacity: "0.8" }

const clickableContainer = { position: "fixed", top: "0px", width: "100vw", height: "100vh", zIndex: "601", marginTop: "-80px", display: "flex", justifyContent: "center", alignItems: "center" }
const infoBox = { width: "600px", backgroundColor: "white", padding: "40px" }

const desktopCont = { width: "100%", display: "flex", justifyContent: "center" }
const desktopComp = { width: "920px", zoom: "0.8" }
const coverPic = { position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.5)", opacity: "1" }


const Note = ({ setMobilePromoState }) => {

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
            const res = await fetch(`api/users/contacts/breaker/${note.breakerId}`, {
                method: 'GET'
            })
            const { data } = await res.json()

            setContactDetails({
                email: data.userEmail,
                phone: data.userPhone,
                social: data.userSocial
            })



        } catch (error) {
            console.log("existing contact err: ", error);
        }
    }


    const tenSecondTimer = () => {
        setTimeout(function () {
            setContactView("CONTACT")
            setMobilePromoState("CONTACT")
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
                            <img src={note.pics[0].url} style={{ width: "100%", filter: "blur(4px)" }} />
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

                                <Action
                                    user={user}
                                    contactReveal={contactReveal}
                                    setContactReveal={setContactReveal}
                                    contactView={contactView}
                                    setContactView={setContactView}
                                    contactDetails={contactDetails}
                                    tenSecondTimer={tenSecondTimer}
                                    deviceSize={"DESKTOP"}
                                    setMobilePromoState={setMobilePromoState}
                                />
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
                            deviceSize={"DESKTOP"}
                        />

                        {note.breakerId !== user.sub && (
                            <Action
                                note={note}
                                user={user}
                                contactReveal={contactReveal}
                                setContactReveal={setContactReveal}
                                contactView={contactView}
                                setContactView={setContactView}
                                contactDetails={contactDetails}
                                tenSecondTimer={tenSecondTimer}
                                deviceSize={"DESKTOP"}
                                setMobilePromoState={setMobilePromoState}
                            />
                        )}

                        <div style={{ height: "120px" }} />

                    </div>
                </div >
            </>
        )
    } else {
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

                {note.breakerId === user.sub ? (
                    <div style={{ padding: "8px" }}>
                        <h1>Property</h1>
                        <div
                            onClick={() => setDeleteModal(true)}
                            style={{ padding: "16px", border: "1px solid red", color: "white", backgroundColor: "black", width: "240px", textAlign: "center", cursor: "pointer" }}
                        >
                            DELETE PROPERTY
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: "8px" }}>
                        <h1>Property</h1>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>  <img height="40px" width="40px" src={note && note.breakerPicture} alt="breaker picture" /></div>
                            <div style={{ width: "16px" }} />
                            <div>Listed by {note.breakerName}</div>
                        </div>

                        <div style={{ height: "24px" }} />

                        <Action
                            user={user}
                            contactReveal={contactReveal}
                            setContactReveal={setContactReveal}
                            contactView={contactView}
                            setContactView={setContactView}
                            contactDetails={contactDetails}
                            tenSecondTimer={tenSecondTimer}
                            deviceSize={"MOBILE"}
                            setMobilePromoState={setMobilePromoState}
                        />
                    </div>

                )}

                <div style={{ height: "24px" }} />

                <Details
                    note={note}
                    mapPath={mapPath}
                    latInPx={latInPx}
                    longInPx={longInPx}
                    deviceSize={"MOBILE"}
                />

                <Photos
                    pics={note.pics}
                />

                {note.breakerId !== user.sub && (
                    <div style={{ padding: "8px" }}>
                        <div style={{ height: "24px" }} />
                        <Action
                            note={note}
                            user={user}
                            contactReveal={contactReveal}
                            setContactReveal={setContactReveal}
                            contactView={contactView}
                            setContactView={setContactView}
                            contactDetails={contactDetails}
                            tenSecondTimer={tenSecondTimer}
                            deviceSize={"MOBILE"}
                            setMobilePromoState={setMobilePromoState}
                        />
                    </div>
                )}

                <div style={{ height: "120px" }} />

            </>

        )
    }
}

export default Note;