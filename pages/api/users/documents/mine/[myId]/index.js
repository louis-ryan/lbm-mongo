import dbConnect from '../../../../../../utils/dbConnect';
import Document from '../../../../../../models/Document';

dbConnect();

export default async (req, res) => {
    const {
        query: { myId },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const documents = await Document.find({ userId: myId });

                res.status(200).json({ success: true, data: documents })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }



}