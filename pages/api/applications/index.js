import dbConnect from '../../../utils/dbConnect';
import Application from '../../../models/Application';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    const urlForEmail = process.env.AUTH0_BASE_URL

    switch (method) {
        case 'POST':
            try {
                await Application.create(req.body);

                res.status(201).json({ success: true, data: urlForEmail })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}