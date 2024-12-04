import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../api";


// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51QSCLDHxUNtX9FQe6tKbCmaMbqo7rWfuybcC0PnT3YgkPeeF6n6PddxWgKiJ7NUwc4sqSHvPA5gByMYRarQOHBDz00W6AEemFn");  // Your publishable key here

const Payment = ({ amount }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the client secret from the backend
    const { data } = await api.post("/api/create-payment-intent/", { amount });

    const clientSecret = data.client_secret;

    // Confirm the payment with the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      // Payment was successful
      alert("Payment succeeded!");
    }
  };

  return (
    <div>
      <h2>Complete your payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  const amount = 2000;  // Example amount in cents (e.g., 2000 for $20.00)

  return (
    <Elements stripe={stripePromise}>
      <Payment amount={amount} />
    </Elements>
  );
};

export default PaymentPage;
