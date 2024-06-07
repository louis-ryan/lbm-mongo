import Stripe from 'stripe';
import { buffer } from 'micro';
import mongoose from 'mongoose';
import User from '../../models/Tier';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return handler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    console.log("webhook init!!!")

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log("type: ", event.type)

    // Handle the event
    switch (event.type) {

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Update the user document with the payment status
        await User.findOneAndUpdate(
          { stripeCustomerId: paymentIntent.customer },
          { paymentStatus: 'succeeded', paymentId: paymentIntent.id }
        );
        break;
      case 'payment_intent.payment_failed':
        const paymentFailedIntent = event.data.object;
        // Update the user document with the payment status
        await User.findOneAndUpdate(
          { stripeCustomerId: paymentFailedIntent.customer },
          { paymentStatus: 'failed', paymentId: paymentFailedIntent.id }
        );
        break;
      // Add more event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default connectDB(handler);
