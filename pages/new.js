import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import PropertyInfo from '../components/Creation/PropertyInfo';
import useWindowWidth from '../custom_hooks/useWindowWidth';
import useNoteFormatForm from '../custom_hooks/useNoteFormatForm';
import useNoteFormInit from '../custom_hooks/useNoteFormInit';
import useNotePostcodeQuery from '../custom_hooks/useNotePostcodeQuery';
import useNoteHandleEvents from '../custom_hooks/useNoteHandleEvents';
import useNoteImageUpload from '../custom_hooks/useNoteImageUpload';


const NewNote = () => {

    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const [part, setPart] = useState(0);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [form, setForm] = useState(useNoteFormInit());
    const { formBools, setFormBools, post, setPost } = useNoteFormatForm(user, form, setForm);
    const { setMapCoords, latInPx, longInPx, validAddresses, setValidAddresses } = useNotePostcodeQuery(form, setForm, errors, setErrors);
    const [handleSubmit, handleChange, handleRent, handlePost, handleMoveInDate, handleContractEnds, handleContractTerminates, handleAddress, handleClearPost, handleType] = useNoteHandleEvents(form, setForm, post, setPost, setValidAddresses, setMapCoords, router, errors, setErrors)
    const { compressFile } = useNoteImageUpload(form, setForm, errors, setErrors)


    /**
     * Redirect to home if no user
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            if (user === undefined) {
                router.push("/api/auth/login");
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [user]);


    useEffect(() => {
        const endOfContract = new Date(form.contractEnds)
        const today = new Date()

        const endOfContractUnix = Math.floor(endOfContract.getTime() / 1000);
        const todayUnix = Math.floor(today.getTime() / 1000);

        if (endOfContractUnix > 0) {
            if (todayUnix > endOfContractUnix) {
                setErrors({ ...errors, contractEnds: "The end of contract date may not be earlier than today's date" })
            } else {
                setErrors({ ...errors, contractEnds: null })
            }
        }
    }, [form])


    useEffect(() => {
        const endOfContract = new Date(form.contractEnds)
        const moveInDate = new Date(form.moveInDate)

        const endOfContractUnix = Math.floor(endOfContract.getTime() / 1000);
        const moveInDateUnix = Math.floor(moveInDate.getTime() / 1000);

        if (moveInDateUnix > 0) {
            if (moveInDateUnix > endOfContractUnix) {
                setErrors({ ...errors, moveInDate: "Your move in date must be before the date of the contract ending" })
            } else {
                setErrors({ ...errors, moveInDate: null })
            }
        }
    }, [form])


    useEffect(() => {
        if (form.description?.length > 1000) {
            setErrors({ ...errors, description: "You have too many characters in your description" })
        } else {
            setErrors({ ...errors, description: null })
        }
    }, [form])



    if (windowWidth > 800 || !windowWidth) {
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ marginTop: "40px" }}>
                    <div style={{ height: "40px" }} />
                    <h2>{"Create Listing"}</h2>
                    <div style={{ height: "16px" }} />

                    {part < 8 && (
                        <div style={{ width: "100%", height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            {
                                [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <div key={num} style={{ width: "24px", height: "24px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: "50%", fontWeight: "600", border: (num - 1) <= part ? "2px solid black" : "1px solid rgb(181, 181, 181)", color: (num - 1) <= part ? "black" : "initial" }}>
                                        {`${num}`}
                                    </div>
                                ))
                            }

                            <div style={{ position: "absolute", zIndex: "-1", width: `${(part * 100)}px`, margin: "0px 12px", height: "2px", backgroundColor: "rgb(103, 103, 103)", transition: "2s" }} />

                        </div>
                    )}


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
                        user={user}
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
                        handleType={handleType}
                    />
                </div>
            </div>
        )
    }

    if (windowWidth <= 800) {
        return (
            <>
                <PropertyInfo
                    handleChange={handleChange}
                    handlePost={handlePost}
                    handleMoveInDate={handleMoveInDate}
                    handleContractEnds={handleContractEnds}
                    handleAddress={handleAddress}
                    handleContractTerminates={handleContractTerminates}
                    errors={errors}
                    form={form}
                    user={user}
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
                    handleType={handleType}
                />
            </>
        )
    }

}

export default NewNote;