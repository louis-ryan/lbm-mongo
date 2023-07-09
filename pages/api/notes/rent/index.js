import dbConnect from '../../../../utils/dbConnect';
import Note from '../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({});

                let rentArr = []

                notes.map((note) => {
                    rentArr.push(note.rent)
                })

                res.status(200).json({ success: true, data: rentArr })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}