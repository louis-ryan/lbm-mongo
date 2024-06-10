import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getPublishableKey = async () => {
  try {
    const res = await fetch(`api/stripeKey`)

    const { pubKey } = await res.json()

    console.log("public key: ", pubKey)

    return pubKey

  } catch (error) {
    console.log("application exists error: ", error);
  }
}

const getStripe = async () => {

  const pubKey = await getPublishableKey()

  if (!stripePromise) {
    stripePromise = loadStripe(pubKey); // Replace with your publishable key
  }
  return stripePromise;
};

export default getStripe;
