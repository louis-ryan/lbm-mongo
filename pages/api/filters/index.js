import dbConnect from '../../../utils/dbConnect';
import Filter from '../../../models/Filter';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const filter = await Filter.create(req.body);

                res.status(201).json({ success: true, data: filter })
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
    }
}