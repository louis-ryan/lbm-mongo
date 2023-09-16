import { useState, useEffect } from 'react'
import useNoteFormBoolsInit from './useNoteFormBoolsInit';
import useNotePostInit from './useNotePostInit';

function useNoteFormatForm(user, form, setForm) {

    const [formBools, setFormBools] = useState(useNoteFormBoolsInit());
    const [post, setPost] = useState(useNotePostInit());


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
            walkToSupermarket: formBools.supermarket,
            walkToStation: formBools.trainStation,
            postCode: `${post.postCode1 + post.postCode2 + post.postCode3 + post.postCode4}`
        })
    }, [user, post, formBools])

    return {
        form: form,
        setForm: setForm,
        formBools: formBools,
        setFormBools: setFormBools,
        post: post,
        setPost, setPost
    }
}

export default useNoteFormatForm