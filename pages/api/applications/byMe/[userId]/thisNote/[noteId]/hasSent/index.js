import dbConnect from '../../../../../../../../utils/dbConnect';
import Application from '../../../../../../../../models/Application';

dbConnect();

export default async (req, res) => {

    const {
        query: { userId, noteId },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const applications = await Application.find({ applicantId: userId, noteId: noteId });

                if (!applications) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, youHaveApplied: applications.length > 0 ? true : false });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}