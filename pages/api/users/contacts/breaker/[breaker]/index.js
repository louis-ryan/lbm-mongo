import dbConnect from '../../../../../../utils/dbConnect';
import Contact from '../../../../../../models/Contact';
import Note from '../../../../../../models/Note';

dbConnect();

export default async (req, res) => {

    const {
        query: { breaker },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const contacts = await Contact.find({ userId: breaker });

                if (contacts.length === 0) {

                    const notes = await Note.find({ breakerId: breaker });

                    const lastNote = notes[notes.length - 1]

                    res.status(200).json({
                        success: true,
                        data: {
                            userId: lastNote.breakerId,
                            userName: lastNote.breakerName,
                            userEmail: lastNote.breakerEmail,
                            userPhone: "",
                            userSocial: ""
                        }
                    })
                } else {
                    res.status(200).json({ success: true, data: contacts[contacts.length - 1] })
                }

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}