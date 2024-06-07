import dbConnect from '../../../../../utils/dbConnect';
import Filter from '../../../../../models/Filter';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const filter = await Filter.findById(id);

                if (!filter) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: filter });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const filter = await Filter.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!filter) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: filter });
            } catch (error) {
                res.status(400).json({ success: false });
            }
        case 'DELETE':
            try {
                const deletedFilter = await Filter.deleteOne({ _id: id });

                if (!deletedFilter) {
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