import { useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getaway_key);
const Payment = () => {
    
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="">
      <Elements stripe={stripePromise}>
        <CheckoutForm  price={data?.price} bookingInfo={data}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
