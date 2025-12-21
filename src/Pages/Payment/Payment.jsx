import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const location = useLocation();
    const { price, newLimit } = location.state || { price: 0, newLimit: 0 };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Upgrade Now</h2>
                <p className="text-center text-gray-500 mb-10">
                    Safe & Secure Payment for <strong>{newLimit} Member Limit</strong>
                </p>

                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} newLimit={newLimit} />
                </Elements>

                <div className="mt-8 flex justify-center gap-4 grayscale opacity-50">
                    <img className="h-6" src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" />
                    <img className="h-6" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                </div>
            </div>
        </div>
    );
};

export default Payment;