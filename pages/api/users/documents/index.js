import dbConnect from '../../../../utils/dbConnect';
import Document from '../../../../models/Document';

dbConnect();

export default async (req, res) => {
    const {
        method
    } = req;

    switch (method) {
        case 'POST':
            try {
                const document = await Document.create(req.body);

                res.status(201).json({ success: true, data: document })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}