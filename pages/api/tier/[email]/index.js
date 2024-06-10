import mongoose from 'mongoose';
import Stripe from 'stripe';
import User from '../../../../models/Tier';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return handler(req, res);
};

const handler = async (req, res) => {
  const { email } = req.query;

  const user = await User.findOne({ email: email });

  if (user && user.paymentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(user.paymentId);
      res.status(200).json({ status: paymentIntent.status });
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving payment status' });
    }
  } else {
    res.status(404).json({ status: 'unpaid' });
  }
};

export default connectDB(handler);
