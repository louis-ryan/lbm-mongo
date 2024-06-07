import dbConnect from '../../utils/dbConnect';

dbConnect();

export default async (req, res) => {

    const pubKey = process.env.STRIPE_PUBLISHABLE_KEY

    try {

        res.status(200).json({ success: true, pubKey: pubKey });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}