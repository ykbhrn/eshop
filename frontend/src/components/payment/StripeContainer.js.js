import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import React from 'react';

const PUBLIC_KEY = 'pk_test_51KLZIEKAzVkc5rRlKgRvQay1fxsWZzXKyehAt936Okc1kzXGka63FxkEfwEkCE4Q9itvB8zPVttKdpWlwvA6K83w00Dyf2bSLM'

const stripePromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm /> 
    </Elements>
  )
}
