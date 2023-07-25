import dbConnect from '../../../../../utils/dbConnect';
import Filter from '../../../../../models/Filter';

dbConnect();

export default async (req, res) => {
    const {
        query: { user },
        method
    } = req;

    switch (method) {
        case 'DELETE':
            try {
                const deletedFilters = await Filter.deleteMany({ userId: user });

                res.status(200).json({ success: true, data: `deleted ${deletedFilters.deletedCount} filters` });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }

}