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
    const [handleSubmit, handleChange, handleRent, handlePost, handleMoveInDate, handleContractEnds, handleContractTerminates, handleAddress, handleClearPost] = useNoteHandleEvents(form, setForm, post, setPost, setValidAddresses, setMapCoords, router, errors, setErrors)
    const { compressFile } = useNoteImageUpload(form, setForm, errors, setErrors)


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
        if (form.description?.length > 200) {
            setErrors({ ...errors, description: "You have too many characters in your description" })
        } else {
            setErrors({ ...errors, description: null })
        }
    }, [form])



    if (windowWidth > 1200 || !windowWidth) {
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ marginTop: "80px", zoom: "0.8" }}>
                    <div style={{ height: "40px" }} />
                    <h1>Create Listing</h1>
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
                    />
                </div>
            </div>
        )
    }

    if (windowWidth <= 1200) {
        return (
            <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>
                        <div style={{ height: "24px" }} />
                        <div>
                            <h1>Create Listing</h1>
                        </div>
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
                />
            </>
        )
    }

}

export default NewNote;