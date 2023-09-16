import dbConnect from '../../../../../../utils/dbConnect';
import Contact from '../../../../../../models/Contact';

dbConnect();

export default async (req, res) => {
    const {
        query: { myId }
    } = req;

    try {
        const contacts = await Contact.find({ userId: myId });

        var lastUpdate = contacts[contacts.length - 1]

        res.status(200).json({ success: true, data: lastUpdate })
    } catch (error) {
        res.status(400).json({ success: false });
    }

}