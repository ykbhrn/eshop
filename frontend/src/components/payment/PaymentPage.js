
import { useState } from 'react';
import StripeContainer from './StripeContainer.js';



function PaymentPage() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className='payment'>
      <h1>The Spatula Store</h1>
      <StripeContainer />
    </div>
  );
}

export default PaymentPage;