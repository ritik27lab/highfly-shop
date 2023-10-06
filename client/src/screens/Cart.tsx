import React, { useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe


function Cart() {
  const stripe = useStripe();
  const elements = useElements();
  const stripeKey: any =  loadStripe(
    "sk_test_51Nxqw1SJTM7D4Hto4E7eShhBdJrvisaYb65hI0vXRi345Lar0jEfhv1q9gn8AV9PvJV6Tuo28iJYq4bkCxuGcLmt0005GgqY3g"
  );
//   const yourData = location?.state.yourDataKey;
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

//   const pay = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/pay", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       const cardElement: any = elements?.getElement(CardElement);
//       const confirmPayment = await stripe?.confirmCardPayment(
//         data.clientSecret,
//         { payment_method: { card: cardElement } }
//       );
//       console.log(confirmPayment);
//       const { paymentIntent }: any = confirmPayment;
//       if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
//       else alert(`Payment failed!`);
//     } catch (err) {
//       console.error(err);
//       alert("There was an error in payment");
//     }
//   };

  const makePayment = async () => {
    
    const response = await fetch("http://localhost:8000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const session = await response.json();

    const result: any = stripeKey.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setPaymentSuccessful(false);
    console.log("HEHE");
    // await pay();
    // navigate('/user');
  };

  return (
    <Elements stripe={stripeKey}>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3"></div>
            
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        {" "}
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tfoot>
                
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{2}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">₹ {2500}</span>
                      </th>
                      <th className="text-right">
                        <button
                          className="btn btn-success"
                          onClick={makePayment}
                          type="button"
                        >
                          Checkout
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>              
            </div>
          </div>
        </div>     
    </Elements>
  );
}

export default Cart;
