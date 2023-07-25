import dbConnect from '../../../../utils/dbConnect';
import Note from '../../../../models/Note';

dbConnect();

export default async (req, res) => {

    var today = new Date()

    try {
        const notes = await Note.deleteMany({contractEnds: {$lte: today}});

        res.status(200).json({ success: true, data: `You have deleted ${notes.deletedCount} test(s)` })
    } catch (error) {
        res.status(400).json({ success: false });
    }

}
