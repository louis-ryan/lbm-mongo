import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Compress from 'react-image-file-resizer';
import PropertyInfo from '../components/Creation/PropertyInfo';
import Logo from '../components/Logo'
import useWindowWidth from '../custom_hooks/useWindowWidth';


const NewNote = () => {

    const latInit = -37.1989648128
    const longInit = 144.340643773

    const onePixLat = 0.00097731799
    const onePixLong = 0.0012070086

    const { user } = useUser();
    const windowWidth = useWindowWidth();

    const [part, setPart] = useState(0);
    const [form, setForm] = useState({
        numBath: '',
        numRoom: '',
        rent: '',
        date: '',
        moveInDate: '',
        contractEnds: '',
        contractTerminates: false
    });
    const [post, setPost] = useState({
        postCode1: '',
        postCode2: '',
        postCode3: '',
        postCode4: '',
    });
    const [validAddresses, setValidAddresses] = useState([]);
    const [mapCoords, setMapCoords] = useState({})
    const [formBools, setFormBools] = useState({
        petsAllowed: false,
        outdoorArea: false,
        garden: false,
        parkingSpace: false,
        supermarket: false,
        trainStation: false,
        sharingWall: false,
        sharingFloor: false
    });
    const [errors, setErrors] = useState({});

    const router = useRouter();

    var latInPx = (latInit - mapCoords.lat) / onePixLat
    var longInPx = (mapCoords.long - longInit) / onePixLong


    /**
     * Send to login if no user for 2 seconds
     */
    useEffect(() => {
        var stillNoUser = false

        if (user === undefined) {
            setTimeout(() => {
                if (user === undefined) {
                    stillNoUser = true
                }
            }, 2000)
        }

        if (stillNoUser) {
            localStorage.setItem("redirect_to", `/new`)
            router.push("/api/auth/login")
        }
    }, [])


    /**
     * Format form
     */
    useEffect(() => {

        if (user === undefined) return

        setForm({
            ...form,

            title: `A new house ${new Date().getTime()}`,

            breakerId: user.sub,
            breakerName: user.name,
            breakerEmail: user.email,
            breakerPicture: user.picture,

            date: Date.now(),

            petsAllowed: formBools.petsAllowed,
            parkingSpace: formBools.parkingSpace,
            outdoorArea: formBools.outdoorArea,
            garden: formBools.garden,
            sharingWall: formBools.sharingWall,
            sharingFloor: formBools.sharingFloor,
            supermarket: formBools.supermarket,
            trainStation: formBools.trainStation,

            postCode: `${post.postCode1 + post.postCode2 + post.postCode3 + post.postCode4}`
        })
    }, [user, post, formBools])


    /**
     * Postcode outside of map...
     */
    useEffect(() => {
        if (latInPx > 1600 || latInPx < 0 || longInPx > 1600 || longInPx < 0) {
            setErrors({ ...errors, address: "it appears that the selected postcode is outside the Melbourne region. We cannot include this in our database." })
            setValidAddresses([])
        }
    }, [latInPx, longInPx])


    /**
     * Search Json for Postcodes
     */
    useEffect(() => {
        if (form.postCode > 2999) {

            async function getLocationsByZip() {
                const res = await fetch(`./postCodes.json?`);
                const data = await res.json()

                var validAddressesArr = []

                if (validAddressesArr.length === 0) {
                    setErrors({ ...errors, address: "the postcode provided does not seem to be a valid Melbourne address. Maybe try a neighbouring postcode." })
                    setValidAddresses([])
                }

                data.map((entry) => {

                    if (`${entry.postcode}` !== form.postCode) return

                    setMapCoords({ lat: entry.latitude, long: entry.longitude })

                    validAddressesArr.push(entry.place_name)

                    setValidAddresses(validAddressesArr)
                    setErrors({ ...errors, address: null })


                })
            }
            getLocationsByZip()
        } else { setForm({ ...form, address: null }) }
    }, [form.postCode])


    /**
     * Send new note to server
     */
    const createNote = async () => {
        try {
            const res = await fetch('api/notes', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            // setIsSubmitting(true)
            // router.push("/");
            const resJSON = await res.json()

            if (res.status === 201) {
                const res = await fetch('api/filters/contact', {
                    method: 'POST',
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, _id: resJSON.data._id })
                })
            }
        } catch (error) {
            console.log("create note err: ", error);
        }
    }

    /**
     * Submit event
     */
    const handleSubmit = () => { createNote() }

    /**
     * Change Event
     * @param {*} e 
     */
    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    /**
    * Change Rent
    * @param {*} e 
    */
    const handleRent = (e) => { setForm({ ...form, [e.target.name]: Number(e.target.value) }) }

    /**
     * Change Post Code
     * @param {*} e 
     */
    const handlePost = (e) => { setPost({ ...post, [e.target.name]: e.target.value }) }

    /**
    * Change Move in Date
    * @param {*} e 
    */
    const handleMoveInDate = (val) => { setForm({ ...form, moveInDate: val }) }

    /**
    * Change End of Contract
     * @param {*} e 
    */
    const handleContractEnds = (val) => { setForm({ ...form, contractEnds: val }) }

    /**
    * Contract Terminating
    * @param {*} e 
    */
    const handleContractTerminates = (val) => { setForm({ ...form, contractTerminates: val }) }

    /**
    * Address
    * @param {*} e 
    */
    const handleAddress = (e) => { setForm({ ...form, address: e }) }

    /**
     * Clear Post Code
     */
    const handleClearPost = () => {
        setPost({ postCode1: '', postCode2: '', postCode3: '', postCode4: '' });
        [1, 2, 3, 4].map((id) => document.getElementsByName(`postCode${id}`)[0].value = null);
        setValidAddresses([]);
        setMapCoords({});
        setErrors({ ...errors, address: null })
    }


    /**
     * UPLOAD PHOTO TO AWS
     * @param {*} newBlob 
     * @param {*} fileName 
     */
    const uploadCompressedPhoto = async (newBlob, compFileName) => {
        const file = newBlob;
        const timeStamp = Math.round(new Date().getTime() / 1000)
        const filename = encodeURIComponent(timeStamp + "" + compFileName);
        const res = await fetch(`/api/upload?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => { formData.append(key, value); });
        const upload = await fetch(url, { method: 'POST', body: formData });

        if (upload.ok) {
            if (form.pics) {
                var newPics = form.pics
                newPics.push({ url: upload.url + "/" + filename })
                setForm({ ...form, newPics });
            } else {
                setForm({ ...form, pics: [{ url: upload.url + "/" + filename }] });
            }

        } else {
            setErrors({ ...errors, pics: "It looks like you need to try a different type of image." });
        }

    };


    /**
     * COMPRESS PHOTO BEFORE UPLOAD (FOR MOBILE)
     * @param {*} e 
     */
    const compressFile = (e) => {
        const file = e.target.files[0];

        Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (image) => {
                const byteString = atob(image.split(',')[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i += 1) { ia[i] = byteString.charCodeAt(i); }
                const newBlob = new Blob([ab], { type: 'image/jpeg' });
                uploadCompressedPhoto(newBlob, file.name)
                return newBlob;
            },
            "base64" // blob or base64 default base64
        );
    }


    if (windowWidth > 1200) {
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                <div style={{ marginTop: "120px", zoom: "0.8" }}>

                    <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.5)", opacity: "0.8" }}>
                        <img
                            src="https://cdn.openagent.com.au/img/blog/2016-12-clifftophouse1-wpt.jpg"
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div
                        onClick={() => router.push('/')}
                        style={{ position: "absolute", top: "16px", left: "24px" }}
                    >
                        <Logo />
                    </div>

                    <div style={{ height: "40px" }} />
                    <div>
                        <h1 style={{ color: "white" }}>Create Post</h1>
                    </div>
                    <div style={{ height: "16px" }} />

                    <PropertyInfo
                        handleChange={handleChange}
                        handlePost={handlePost}
                        handleMoveInDate={handleMoveInDate}
                        handleContractEnds={handleContractEnds}
                        handleAddress={handleAddress}
                        handleContractTerminates={handleContractTerminates}
                        errors={errors}
                        form={form}
                        setForm={setForm}
                        formBools={formBools}
                        setFormBools={setFormBools}
                        compressFile={compressFile}
                        handleSubmit={handleSubmit}
                        part={part}
                        setPart={setPart}
                        postCode={form.postCode}
                        validAddresses={validAddresses}
                        latInPx={latInPx}
                        longInPx={longInPx}
                        handleClearPost={handleClearPost}
                        post={post}
                        handleRent={handleRent}
                        device={"DESKTOP"}
                    />

                </div>
            </div >

        )
    } else {
        return (
            <div style={{ marginBottom: "40px" }}>

                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>
                        <div><h1>Create Post</h1></div>

                        <Link href="/"><h4>{'< Back to listings'}</h4></Link>

                        {/* <div style={{ width: part === 0 ? "0px" : part === 1 ? "100px" : part === 2 ? "200px" : part === 3 ? "300px" : "400px", transition: "width 1s linear", height: "2px", position: "absolute", backgroundColor: "black", marginTop: "-9px", zIndex: "-1" }} /> */}

                        <div style={{ height: "24px" }} />
                    </div>
                </div>

                <PropertyInfo
                    handleChange={handleChange}
                    handlePost={handlePost}
                    handleMoveInDate={handleMoveInDate}
                    handleContractEnds={handleContractEnds}
                    handleAddress={handleAddress}
                    handleContractTerminates={handleContractTerminates}
                    errors={errors}
                    form={form}
                    setForm={setForm}
                    formBools={formBools}
                    setFormBools={setFormBools}
                    compressFile={compressFile}
                    handleSubmit={handleSubmit}
                    part={part}
                    setPart={setPart}
                    postCode={form.postCode}
                    validAddresses={validAddresses}
                    latInPx={latInPx}
                    longInPx={longInPx}
                    handleClearPost={handleClearPost}
                    post={post}
                    handleRent={handleRent}
                    device={"MOBILE"}
                />
            </div>

        )
    }

}

export default NewNote;