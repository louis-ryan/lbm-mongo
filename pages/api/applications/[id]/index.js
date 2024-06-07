import dbConnect from '../../../../utils/dbConnect';
import Note from '../../../../models/Application';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'PUT':
            try {
                const application = await Note.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!application) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: application });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}