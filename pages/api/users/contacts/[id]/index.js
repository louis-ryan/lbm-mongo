import dbConnect from '../../../../../utils/dbConnect';
import Contact from '../../../../../models/Contact';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'PUT':
            try {
                const contact = await Contact.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!contact) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}