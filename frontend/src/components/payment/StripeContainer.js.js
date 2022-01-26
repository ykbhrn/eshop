import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import React from 'react';

const PUBLIC_KEY = process.env.STRIPE_PUBLISHABLE_KEY

const stripePromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm /> 
    </Elements>
  )
}
