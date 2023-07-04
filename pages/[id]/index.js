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


    useRedirect(note, user, router)

    var latInPx = (latInit - mapCoords.lat) / onePixLat
    var longInPx = (mapCoords.long - longInit) / onePixLong


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
            <div style={desktopCont}>
                <div style={desktopComp}>
                    <div style={coverPic}>
                        <img src={note.pics[0].url} style={{ width: "100%" }} />
                    </div>
                    <div onClick={() => { router.push('/') }} style={{ position: "absolute", top: "16px", left: "24px", cursor: "pointer" }} >
                        <img src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/5cf24fcb-d5dc-44b2-a321-b28ee3d3e00d/lbm_new_logo.png?format=500w" />
                    </div>
                    <div style={{ height: "140px" }} />

                    {note.breakerId === user.sub ? (
                        <>
                            <h1 style={{ color: "white" }}>Your property in {note.address}</h1>
                            <div style={{ padding: "16px", backgroundColor: "black", color: "white", width: "240px", textAlign: "center" }}>DELETE PROPERTY</div>
                            <div style={{ height: "16px" }} />
                        </>
                    ) : (
                        <>
                            <h1 style={{ color: "white" }}>Property in {note.address}</h1>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>  <img height="40px" width="40px" src={note.breakerPicture} alt="breaker picture" /></div>
                                <div style={{ width: "16px" }} />
                                <h2 style={{ color: "white", transform: "translateY(-12px)" }}>Listed by {note.breakerName}</h2>
                            </div>

                            <div style={{ width: "100%", background: "lightgray", display: "flex", justifyContent: "center", alignItems: "center", height: "80px", borderRadius: "8px" }}>
                                <h4>{"Reveal Breaker's Contact Information"}</h4>
                            </div>


                            {/* <div style={{ backgroundColor: "lightgray", padding: "24px" }}>
                                {messageStatus !== "SENT" ? (
                                    <>
                                        <h2 style={{ color: "black", transform: "translateY(-12px)" }}>Message Breaker</h2>
                                        <textarea style={{ width: "100%" }}
                                            onChange={(e) => setMessageToBreaker(e.target.value)}
                                        />
                                        <button onClick={() => sendEmailToBreaker()}>SEND!</button>
                                    </>
                                ) : (
                                    <h2 style={{ color: "black", transform: "translateY(-12px)" }}>{`You have sent a message to ${note.breakerName}. You must wait 1 hour before you can send another email.`}</h2>
                                )}

                            </div> */}
                        </>
                    )}

                    <div style={{ height: "24px" }} />


                    <Details
                        note={note}
                        mapPath={mapPath}
                        latInPx={latInPx}
                        longInPx={longInPx}
                    />

                    <PhotosDesk
                        pics={note.pics}
                    />

                </div>
            </div >

        )
    } else {
        return (

            <div style={{ width: "100%" }}>

                <div style={{ height: "80px" }} />

                <div onClick={() => { router.push('/') }} style={{ padding: "24px" }}>
                    {'< BACK TO LISTINGS'}
                </div>

                <div style={{ height: "24px" }} />

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

        )
    }
}

export default Note;