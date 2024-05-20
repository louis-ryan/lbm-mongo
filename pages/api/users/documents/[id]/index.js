import dbConnect from '../../../../../utils/dbConnect';
import Document from '../../../../../models/Document';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'DELETE':
            try {
                const deletedDocument = await Document.deleteOne({ _id: id });

                console.log("deleted: ", deletedDocument)

                if (!deletedDocument) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }



}