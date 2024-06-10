import Stripe from 'stripe';
import mongoose from 'mongoose';
import User from '../../models/Tier';

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
  if (req.method === 'POST') {
    const { email, noteId } = req.body;

    try {
      const customer = await stripe.customers.create({
        email,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/${noteId}/paymentSuccess`,
        cancel_url: `${req.headers.origin}/${noteId}`,
        customer: customer.id,
      });

      // Extract the payment_intent from the session
      const paymentIntentId = session.payment_intent;

      await User.findOneAndUpdate(
        { email },
        { stripeCustomerId: customer.id, paymentId: paymentIntentId },
        { upsert: true, new: true }
      );

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default connectDB(handler);
