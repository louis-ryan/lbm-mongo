import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropertyInfo from '../components/Creation/PropertyInfo';
import useWindowWidth from '../custom_hooks/useWindowWidth';
import useNoteFormatForm from '../custom_hooks/useNoteFormatForm';
import useNoteFormInit from '../custom_hooks/useNoteFormInit';
import useNotePostcodeQuery from '../custom_hooks/useNotePostcodeQuery';
import useNoteHandleEvents from '../custom_hooks/useNoteHandleEvents';
import useNoteImageUpload from '../custom_hooks/useNoteImageUpload';

import Logo from '../public/lbm_new_logo.svg';


const NewNote = () => {

    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const [part, setPart] = useState(0);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [form, setForm] = useState(useNoteFormInit());
    const { formBools, setFormBools, post, setPost } = useNoteFormatForm(user, form, setForm);
    const { setMapCoords, latInPx, longInPx, validAddresses, setValidAddresses } = useNotePostcodeQuery(form, setForm, errors, setErrors);
    const [handleSubmit, handleChange, handleRent, handlePost, handleMoveInDate, handleContractEnds, handleContractTerminates, handleAddress, handleClearPost] = useNoteHandleEvents(form, setForm, post, setPost, setValidAddresses, setMapCoords, router, setErrors)
    const { compressFile } = useNoteImageUpload(form, setForm, errors, setErrors)


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
                    <div onClick={() => router.push('/')} style={{ position: "absolute", top: "16px", left: "24px", cursor: "pointer" }}>
                        <Logo />
                    </div>
                    <div style={{ height: "40px" }} />
                    <h1 style={{ color: "white" }}>Create Post</h1>
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
            </div>
        )
    } else {
        return (
            <div style={{ marginBottom: "40px" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>
                        <div><h1>Create Post</h1></div>
                        <Link href="/"><h4>{'< Back to listings'}</h4></Link>
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