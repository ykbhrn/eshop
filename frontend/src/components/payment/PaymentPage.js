
import { useState } from 'react';
import StripeContainer from './StripeContainer.js';

function PaymentPage() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className='payment'>
      <h1>The Spatula Store</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <h3>$10.00</h3>
          <img src={'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80'} 
            width= "200" height= "200" alt='Spatula' />
          <button onClick={() => setShowItem(true)}>Purchase Spatula</button>
        </>
      )}
    </div>
  );
}

export default PaymentPage;