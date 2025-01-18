import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useEffect, useState } from "react";
// import { toast } from "react-toastify";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CheckOutFrom = ({ price, bookingInfo}) => {
    const {user} = useAuth();
    const [clientSecret, setClientSecret] = useState()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    console.log(price)
//     
//   

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        // conform card payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card:card,
                billing_details: {
                    email:user.email,
                    name:user.displayName
                }
            }
        })
        if(confirmError){
            console.log(confirmError)
        }
        else{
            console.log('paymentIntent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                toast.success('payment success full')
                const payment = {
                    touristEmail: user.email,
                    paymentMethod:'stripe',
                    transactionId: paymentIntent.id,
                    amount:price,
                    status: 'success',
                    bookingId: bookingInfo?._id,
                    guideId:bookingInfo?.guideId,
                    paymentDate: new Date()
                }

                const res = await axiosSecure.post('/payments', payment);
                if(res.status === 200){
                    navigate('/dashboard/touristDashboard/myBookings')
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full text-green-500">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#22c55e',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-success" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};
CheckOutFrom.propTypes ={
    price: PropTypes.number,
    bookingInfo: PropTypes.object
}
export default CheckOutFrom;