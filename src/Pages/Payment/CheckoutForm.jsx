import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/axiosSecure";

const CheckoutForm = ({ price, newLimit }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user, profileRefetch } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { email: user?.email, name: user?.name }
            }
        });

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            const res = await axiosSecure.patch('/update-package-after-payment', {
                email: user.email,
                newLimit: newLimit
            });

            if (res.data.modifiedCount > 0) {
                toast.success(`Payment Success! ID: ${paymentIntent.id}`);
                profileRefetch();
                navigate('/dashboard/hr');
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
                <CardElement options={{
                    style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
                }} />
            </div>
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary w-full bg-teal-600 border-none hover:bg-teal-700 shadow-lg text-white font-bold"
            >
                {processing ? <span className="loading loading-spinner"></span> : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;