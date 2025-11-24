// import React from 'react'

// const Checkout = ({totalAmount}) => {
//   return (
//     <div>
//         <form action="/create-checkout-session" method="POST">
//                         <p className='font-semibold text-xl text-gray-500'>Total Amount: ${totalAmount}</p>
//                         <button className='p-3 w-full bg-green-600 rounded-md cursor-pointer mt-5' type="submit">
//                             Checkout Now
//                         </button>
//         </form>
//     </div>
//   )
// }

// export default Checkout


// client/src/Checkout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout(props) {
  const [amount, setAmount] = useState(props.totalAmount);
  const [loading, setLoading] = useState(false);


  // The successUrl should be the absolute URL to your frontend success page:
  // e.g. http://localhost:3000/success
  const successUrl = `${window.location.origin}/success`;

  const publishableKey = "pk_test_51SWMjGCp5qh3GmFX9HQQgMC1ybYENnBw9gJK177ZPyP8qr00F9jSH8y3WxnzLK5w01tcwKMMCLrrfexZWmZdUn1R00YDNUImAo"

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const payload = {
        successUrl,
        amount, 
        publishableKey
      };

      const { data } = await axios.post(`http://localhost:3000/create-checkout-session`, payload);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("No session URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating checkout session: " + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    setAmount(props.totalAmount);
        }, [props.totalAmount]);    
  return (
    <div style={{ padding: 20, maxWidth: 520 }}>
      
                        <label> Total Amount is: </label>
                        
                         <input value={amount} />
                         <button onClick={handleCheckout} className='p-3 w-full bg-green-600 rounded-md cursor-pointer mt-5' >
                             Checkout Now
                            {loading ? "Creating..." : "Pay with Stripe"}
                         </button>
         
    </div>
  );
}
