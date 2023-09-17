import dbConnect from '../../../../../utils/dbConnect';
import Note from '../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const { query: { user } } = req;





    try {
        const notes = await Note.find({breakerId: user})

        if (!notes) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(400).json({ success: false, data: error });
    }


}