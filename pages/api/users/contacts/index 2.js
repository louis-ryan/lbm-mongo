import dbConnect from '../../../../utils/dbConnect';
import Contact from '../../../../models/Contact';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const contacts = await Contact.find({});

                res.status(200).json({ success: true, data: contacts[contacts.length - 1] })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const contact = await Contact.create(req.body);

                res.status(201).json({ success: true, data: contact })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}